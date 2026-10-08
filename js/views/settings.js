// SETTINGS — start date, theme, backup, reset.
import { exportJSON, importJSON, resetState } from '../state.js';
import * as E from '../engine.js';
import { esc, fmtDate, toast } from '../ui.js';

export function render(ctx) {
  const S = ctx.S;
  const html = `
  <div class="page-head"><div><div class="eyebrow">Your program</div><h1>Settings</h1>
    <p>Everything is stored in this browser only. There are no accounts and no external tools. Export a backup to move your progress between devices.</p></div></div>
  <div class="grid g2">
    <div class="card pad stack">
      <h2>Day 1 start date</h2>
      <p class="small dim">The calendar moves to the next day at local midnight. Changing the date shifts "today" but keeps all your progress.</p>
      <div class="row"><input type="date" id="startIn" value="${esc(S.start)}"><button type="button" class="btn primary" data-act="save-start">Save date</button></div>
      ${S.start ? `<div class="small">Day 1: <b>${fmtDate(E.dateOfDay(S, 1))}</b> · Day 28: <b>${fmtDate(E.dateOfDay(S, 28))}</b> · ${E.calendarDay(S, ctx.now()) === 0 ? 'not started yet' : 'you are on Day ' + E.currentDay(S, ctx.now())}</div>` : '<div class="small dim">No start date set.</div>'}
    </div>
    <div class="card pad stack">
      <h2>Theme</h2>
      <div class="seg">${['auto', 'light', 'dark'].map(t => `<button type="button" data-theme-set="${t}" class="${S.theme === t ? 'on' : ''}">${t[0].toUpperCase() + t.slice(1)}</button>`).join('')}</div>
      <p class="small dim">Auto follows your system setting.</p>
    </div>
    <div class="card pad stack">
      <h2>Backup</h2>
      <p class="small dim">Export saves everything (steps, confidence, answers, attempts, challenge status) to a JSON file. Import replaces your current progress with the file's contents.</p>
      <div class="row"><button type="button" class="btn" data-act="export">⬇ Export progress</button>
        <label class="btn" for="importIn">⬆ Import progress</label><input type="file" id="importIn" accept="application/json,.json" class="sr-only"></div>
    </div>
    <div class="card pad stack">
      <h2>Reset</h2>
      <p class="small dim">Clears all progress and the start date on this device. Your theme is kept. This cannot be undone, so export a backup first.</p>
      <div><button type="button" class="btn danger" data-act="reset">Reset all progress</button></div>
    </div>
  </div>`;
  return {
    title: 'Settings', html,
    mount(el) {
      let armed = false;
      el.addEventListener('click', e => {
        const th = e.target.closest('[data-theme-set]');
        if (th) { S.theme = th.dataset.themeSet; ctx.save(); window.dispatchEvent(new Event('themechange')); ctx.rerender(); return; }
        const b = e.target.closest('[data-act]'); if (!b) return;
        const a = b.dataset.act;
        if (a === 'save-start') {
          const v = el.querySelector('#startIn').value;
          if (!/^\d{4}-\d{2}-\d{2}$/.test(v)) { toast('Pick a valid date'); return; }
          S.start = v; ctx.save(); toast('Start date saved'); ctx.rerender();
        } else if (a === 'export') {
          const blob = new Blob([exportJSON(S)], { type: 'application/json' });
          const url = URL.createObjectURL(blob), link = document.createElement('a');
          link.href = url; link.download = `alteryx-28day-progress-${new Date().toISOString().slice(0, 10)}.json`;
          document.body.appendChild(link); link.click(); link.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000);
          toast('Progress exported');
        } else if (a === 'reset') {
          if (!armed) { armed = true; b.classList.add('armed'); b.textContent = 'Click again to permanently reset'; setTimeout(() => { armed = false; b.classList.remove('armed'); b.textContent = 'Reset all progress'; }, 5000); return; }
          ctx.S = resetState(S); ctx.save(); toast('All progress reset'); location.hash = '#/home'; ctx.rerender();
        }
      });
      el.querySelector('#importIn').addEventListener('change', async ev => {
        const f = ev.target.files[0]; if (!f) return;
        try { ctx.S = importJSON(await f.text()); ctx.save(); toast('Progress imported'); ctx.rerender(); }
        catch (err) { toast(err.message || 'Could not import that file'); }
      });
    },
  };
}
