/**
 * [INPUT]: novel - Notion 风格编辑器
 * [OUTPUT]: CourseEditor - 课程内容编辑器
 * [POS]: 章节内容编辑组件，封装 Novel 编辑器
 *
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import { EditorRoot, EditorContent, type JSONContent } from 'novel';
import { useState } from 'react';
import { Button } from '@/components/ui/form/button';

// ============================================================================
// 类型定义
// ============================================================================

interface CourseEditorProps {
  initialContent?: JSONContent;
  onSave: (content: JSONContent) => Promise<void>;
}

// ============================================================================
// CourseEditor 组件
// ============================================================================

export function CourseEditor({ initialContent, onSave }: CourseEditorProps) {
  const [content, setContent] = useState<JSONContent | undefined>(initialContent);
  const [isSaving, setIsSaving] = useState(false);

  async function handleSave() {
    if (!content) return;
    setIsSaving(true);
    await onSave(content);
    setIsSaving(false);
  }

  return (
    <div className="space-y-4">
      <div className="border border-border min-h-[400px]">
        <EditorRoot>
          <EditorContent
            initialContent={initialContent}
            onUpdate={({ editor }) => {
              setContent(editor.getJSON());
            }}
            className="prose prose-sm max-w-none p-4"
          />
        </EditorRoot>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave} isLoading={isSaving}>保存内容</Button>
      </div>
    </div>
  );
}
