// Builds the before/after mock cards the same way project.html does, so the
// numbering of the notes (desktop callouts + mobile list) stays identical.
export function renderBeforeAfter(before: any, after: any, caption?: string): string {
    const bn = before.notes || {};
    const an = after.textNotes || [];
    let noteList: string[] = [];
    const hl = (inner: string, note?: string) => {
        if (!note) return inner;
        noteList.push(note);
        return `<div class="ba-hl"><span class="ba-num" aria-hidden="true">${noteList.length}</span><span class="ba-note">${note}</span>${inner}</div>`;
    };
    const mobileNotes = (tone: string) => {
        const out = noteList.length
            ? `<ol class="ba-notes-mobile is-${tone}">${noteList.map((n, i) => `<li><span class="ba-num">${i + 1}</span><span>${n}</span></li>`).join('')}</ol>`
            : '';
        noteList = [];
        return out;
    };
    
    return `
        <div class="card before">
            <span class="badge">${before.badge}</span>
            ${hl(`<div class="mock-title">${before.title}</div>`, bn.title)}
            ${before.items ? `<ul>${before.items.map((item: string) => `<li>${item}</li>`).join('')}</ul>` : ''}
            ${before.text ? hl(`<p class="wall">${before.text}</p>`, bn.text) : ''}
            ${before.tip ? hl(`<p class="wall">${before.tip}</p>`, bn.tip) : ''}
            <span class="done">${before.done}</span>
        </div>
        ${mobileNotes('before')}
        <div class="card after">
            <span class="badge">${after.badge}</span>
            ${hl(`<h4>${after.heading}</h4>`, after.headingNote)}
            ${after.why ? `<div class="why">${after.why}</div>` : ''}
            ${[].concat(after.text).map((t, i) => hl(`<p>${t}</p>`, an[i])).join('')}
            ${after.items ? `<ul class="steps">${after.items.map((item: string) => `<li>${item}</li>`).join('')}</ul>` : ''}
            ${(after.groups || []).map((g: any) => hl(`
                <div class="sub">${g.label}</div>
                <ul class="steps">${g.items.map((item: string) => `<li>${item}</li>`).join('')}</ul>
            `, g.note)).join('')}
            ${after.rows.map((row: any) => row.tip ? `
                <div class="tip">
                    <div class="sub">${row.sub}</div>
                    <div>${row.row}</div>
                </div>
            ` : `
                <div class="sub"${row.sub === 'Good to know' ? ' style="margin-top:12px"' : ''}>${row.sub}</div>
                <div class="row">${row.row}</div>
            `).join('')}
            ${after.done ? `<div class="done-when">${after.done}</div>` : ''}
            ${after.markDone ? `<span class="done">${after.markDone}</span>` : ''}
        </div>
        ${mobileNotes('after')}
        ${caption ? `<figcaption>${caption}</figcaption>` : ''}
    `;
}

export function isAnnotated(before: any, after: any): boolean {
    return !!(before.notes || after.headingNote || after.textNotes || (after.groups || []).some((g: any) => g.note));
}
