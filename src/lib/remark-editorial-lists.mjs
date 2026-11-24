// Markdown lists written directly in a case study section get the
// editorial list styles (same classes project.html adds to ul/ol blocks).
// Lists inside other components (e.g. <Questions>) are left alone.
export default function remarkEditorialLists() {
    return (tree) => {
        const visit = (node) => {
            for (const child of node.children || []) {
                const parentIsSection = node.type === 'root' || (node.type === 'mdxJsxFlowElement' && (node.name === 'Section' || node.name === 'Overview'));
                if (child.type === 'list' && parentIsSection) {
                    child.data = child.data || {};
                    child.data.hProperties = { className: [child.ordered ? 'editorial-numbered-list' : 'editorial-clean-list'] };
                }
                visit(child);
            }
        };
        visit(tree);
    };
}
