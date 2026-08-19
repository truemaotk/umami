'use client';

import { Column, Text } from '@umami/react-zen';
import { useEffect } from 'react';
import { BoardControls } from '@/app/(main)/boards/[boardId]/BoardControls';
import { BoardViewBody } from '@/app/(main)/boards/[boardId]/BoardViewBody';
import { WebsitesDataTable } from '@/app/(main)/websites/WebsitesDataTable';
import { Empty } from '@/components/common/Empty';
import { PageBody } from '@/components/common/PageBody';
import { Panel } from '@/components/common/Panel';
import { useBoard, useMessages, useNavigation } from '@/components/hooks';
import { DashboardProvider } from './DashboardProvider';
import { DashboardViewHeader } from './DashboardViewHeader';

function DashboardContent() {
  const { board } = useBoard();
  const { t, messages } = useMessages();
  const rows = board?.parameters?.rows ?? [];

  const hasComponents = rows.some(row =>
    row.columns?.some(column => !!column.component),
  );

  if (!hasComponents) {
    return <Empty message={t(messages.emptyDashboard)} />;
  }

  return <BoardViewBody />;
}

export function DashboardViewPage() {
  const { teamId, router } = useNavigation();

  useEffect(() => {
    if (teamId) {
      router.replace('/dashboard');
    }
  }, [teamId, router]);

  if (teamId) {
    return null;
  }

  return (
    <DashboardProvider>
      <PageBody>
        <Column gap="6">
          <DashboardViewHeader />

          {/* 全部网站总览 */}
          <Column gap="3">
            <Text weight="bold">全部网站总览</Text>

            <Panel>
              <WebsitesDataTable showActions={false} />
            </Panel>
          </Column>

          {/* Umami 原有仪表盘功能 */}
          <BoardControls />

          <DashboardContent />
        </Column>
      </PageBody>
    </DashboardProvider>
  );
}
