document.addEventListener("DOMContentLoaded", () => {
  // Calendar functionality (only on calendar page)
  if (document.getElementById('calendar-grid')) {
    initCalendar();
  }

  // Forum form
  const forumPanel = document.getElementById("new-post-panel");
  const openForumBtn = document.getElementById("open-form-btn");
  const cancelForumBtn = document.getElementById("cancel-form-btn");

  if (openForumBtn && forumPanel) {
    openForumBtn.addEventListener("click", () => forumPanel.classList.toggle("open"));
  }
  if (cancelForumBtn && forumPanel) {
    cancelForumBtn.addEventListener("click", () => forumPanel.classList.remove("open"));
  }

  // Like buttons
  document.querySelectorAll(".like-btn").forEach(btn => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.id;
      const span = btn.querySelector("span");
      try {
        await fetch(`/like/${id}`, { method: "POST" });
        span.textContent = parseInt(span.textContent, 10) + 1;
      } catch (e) { console.error(e); }
    });
  });

  // Calendar form
  const eventPanel = document.getElementById("new-event-panel");
  const openEventBtn = document.getElementById("open-event-form-btn");
  const cancelEventBtn = document.getElementById("cancel-event-btn");

  if (openEventBtn && eventPanel) {
    openEventBtn.addEventListener("click", () => eventPanel.classList.toggle("open"));
  }
  if (cancelEventBtn && eventPanel) {
    cancelEventBtn.addEventListener("click", () => eventPanel.classList.remove("open"));
  }

  // Notes form
  const notePanel = document.getElementById("new-note-panel");
  const openNoteBtn = document.getElementById("open-note-form-btn");
  const cancelNoteBtn = document.getElementById("cancel-note-btn");

  if (openNoteBtn && notePanel) {
    openNoteBtn.addEventListener("click", () => notePanel.classList.toggle("open"));
  }
  if (cancelNoteBtn && notePanel) {
    cancelNoteBtn.addEventListener("click", () => notePanel.classList.remove("open"));
  }
});

function initCalendar() {
  const calendarGrid = document.getElementById('calendar-grid');
  const monthYear = document.getElementById('month-year');
  const prevBtn = document.getElementById('prev-month');
  const nextBtn = document.getElementById('next-month');
  
  let currentDate = new Date();
  
  function generateCalendar(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    monthYear.textContent = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    let gridHTML = '';
    
    for (let i = 0; i < firstDay; i++) {
      gridHTML += '<div class="day-cell empty"></div>';
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      const dayDate = new Date(year, month, day);
      const isToday = dayDate.toDateString() === new Date().toDateString();
      const dayStr = `${date.toLocaleDateString('en-US', { month: 'short' })} ${day}`;
      
      let eventsCount = window.events.filter(e => 
        e.datetime.startsWith(dayStr)
      ).length;
      
      gridHTML += `
        <div class="day-cell ${isToday ? 'day-today' : ''}" data-date="${dayStr}">
          <div class="day-number">${day}</div>
          ${eventsCount > 0 ? `<div class="event-dot" title="${eventsCount} event${eventsCount > 1 ? 's' : ''}"></div>` : ''}
        </div>
      `;
    }
    
    calendarGrid.innerHTML = gridHTML;
    
    document.querySelectorAll('.day-cell:not(.empty)').forEach(cell => {
      cell.addEventListener('click', function() {
        const dateStr = this.dataset.date;
        document.getElementById('event-datetime').value = `${dateStr} at `;
        document.getElementById('new-event-panel').classList.add('open');
      });
    });
  }
  
  prevBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    generateCalendar(currentDate);
  });
  
  nextBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    generateCalendar(currentDate);
  });
  
  generateCalendar(currentDate);
}
