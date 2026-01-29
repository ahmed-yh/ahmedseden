/**
 * Callout MDX Component
 * 
 * Stylized callout boxes for highlighting important information
 * Usage: <Callout type="info|warning|tip">Content</Callout>
 */

import { Info, AlertTriangle, Lightbulb } from 'lucide-react';

interface CalloutProps {
  type?: 'info' | 'warning' | 'tip';
  children: React.ReactNode;
}

const icons = {
  info: Info,
  warning: AlertTriangle,
  tip: Lightbulb,
};

const styles = {
  info: {
    bg: 'bg-blue-50 dark:bg-blue-950/30',
    border: 'border-blue-200 dark:border-blue-800',
    icon: 'text-blue-500 dark:text-blue-400',
  },
  warning: {
    bg: 'bg-amber-50 dark:bg-amber-950/30',
    border: 'border-amber-200 dark:border-amber-800',
    icon: 'text-amber-500 dark:text-amber-400',
  },
  tip: {
    bg: 'bg-green-50 dark:bg-green-950/30',
    border: 'border-green-200 dark:border-green-800',
    icon: 'text-green-500 dark:text-green-400',
  },
};

export default function Callout({ type = 'info', children }: CalloutProps) {
  const Icon = icons[type] || icons.info;
  const style = styles[type] || styles.info;

  return (
    <div
      className={`my-8 p-6 rounded-lg border-l-4 ${style.bg} ${style.border} shadow-sm transition-all duration-300 hover:shadow-md`}
      role="note"
    >
      <div className="flex gap-4">
        <div className="shrink-0 mt-1">
          <Icon className={`w-5 h-5 ${style.icon}`} aria-hidden="true" />
        </div>
        <div className="prose prose-sm dark:prose-invert max-w-none prose-p:my-0">
          {children}
        </div>
      </div>
    </div>
  );
}
