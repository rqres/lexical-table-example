import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { TablePlugin } from "@lexical/react/LexicalTablePlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import ToolbarPlugin from "./plugins/TableToolbar";
import ExampleTheme from "./themes/ExampleTheme";
import { TableContext } from "./plugins/TablePlugin";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import TableCellActionMenuPlugin from "./plugins/TableActionMenuPlugin";
import TableCellResizer from "./plugins/TableCellResizer";

import { useState } from "react";

const editorConfig = {
  theme: ExampleTheme,
  onError(error) {
    throw error;
  },
  nodes: [TableCellNode, TableNode, TableRowNode]
};

export default function Editor() {
  const [floatingAnchorElem, setFloatingAnchorElem] = useState(null);

  const onRef = (_floatingAnchorElem) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <TableContext>
        <div className="editor-container">
          <ToolbarPlugin />
          <TablePlugin />
          <TableCellResizer />

          <RichTextPlugin
            contentEditable={
              <div className="editor-input">
                <div className="editor" ref={onRef}>
                  <ContentEditable className={"ContentEditable__root"} />
                </div>
              </div>
            }
            placeholder={<Placeholder />}
          />
        </div>

        {floatingAnchorElem && (
          <>
            <TableCellActionMenuPlugin anchorElem={floatingAnchorElem} />
          </>
        )}
      </TableContext>
    </LexicalComposer>
  );
}

function Placeholder() {
  return (
    <div className="editor-placeholder">
      Play around with the table plugin...
    </div>
  );
}
