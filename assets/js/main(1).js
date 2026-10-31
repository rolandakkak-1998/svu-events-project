document.addEventListener("DOMContentLoaded", () => {
    
    const latestContainer = document.getElementById("latest-events-container");
    if (latestContainer && typeof events !== "undefined") {
        events.slice(0, 3).forEach(event => { 
            const col = document.createElement("div");
            col.className = "col-md-4 mb-4";
            col.innerHTML = `
                <div class="event-card h-100 d-flex flex-column justify-content-between">
                    <div>
                        <img src="${event.image}" alt="${event.title}" class="img-fluid rounded mb-3 w-100" style="height: 180px; object-fit: cover;">
                        <span class="badge bg-secondary mb-2">${event.category}</span>
                        <h4 class="h5 fw-bold">${event.title}</h4>
                        <p class="text-muted small mb-2">${event.date} | ${event.location}</p>
                        <p class="small">${event.description}</p>
                    </div>
                    <a href="event.html?id=${event.id}" class="btn btn-outline-primary btn-sm mt-3">التفاصيل</a>
                </div>
            `;
            latestContainer.appendChild(col);
        });
    }

    const eventsGrid = document.getElementById("events-grid");
    const searchInput = document.getElementById("search-input");
    const categoryFilter = document.getElementById("category-filter");

    function renderEvents(filterText = "", filterCat = "") {
        if (!eventsGrid || typeof events === "undefined") return;
        eventsGrid.innerHTML = "";

        const filtered = events.filter(event => {
            const matchesText = event.title.toLowerCase().includes(filterText.toLowerCase());
            const matchesCat = !filterCat || event.category === filterCat;
            return matchesText && matchesCat;
        });

        if (filtered.length === 0) {
            eventsGrid.innerHTML = `<p class="text-center text-muted">لا توجد نتائج مطابقة لبحثك.</p>`;
            return;
        }

      filtered.forEach(event => {
            const col = document.createElement("div");
            col.className = "col-md-4 mb-4";
            col.innerHTML = `
                <div class="event-card h-100 d-flex flex-column justify-content-between">
                    <div>
                        <img src="${event.image}" alt="${event.title}" class="img-fluid rounded mb-3 w-100" style="height: 180px; object-fit: cover;">
                        
                        <span class="badge bg-secondary mb-2">${event.category}</span>
                        <h4 class="h5 fw-bold">${event.title}</h4>
                        <p class="text-muted small mb-2">${event.date} | ${event.location}</p>
                        <p class="small">${event.description}</p>
                    </div>
                    <a href="event.html?id=${event.id}" class="btn btn-outline-primary btn-sm mt-3">التفاصيل</a>
                </div>
            `;
            eventsGrid.appendChild(col);
        });
    }

    if (eventsGrid) {
        renderEvents();
        if (searchInput) searchInput.addEventListener("input", (e) => renderEvents(e.target.value, categoryFilter.value));
        if (categoryFilter) categoryFilter.addEventListener("change", (e) => renderEvents(searchInput.value, e.target.value));
    }

    const eventTitleEl = document.getElementById("event-title");
    const eventDateLocEl = document.getElementById("event-date-location");
    const eventDescEl = document.getElementById("event-desc");
    const eventImageEl = document.getElementById("event-image"); // تعريف عنصر الصورة

    if (eventTitleEl && typeof events !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        const eventId = params.get("id");
        const foundEvent = events.find(item => item.id === eventId);

        if (foundEvent) {
            eventTitleEl.textContent = foundEvent.title;
            eventDateLocEl.textContent = `${foundEvent.date} — ${foundEvent.location} (${foundEvent.category})`;
            eventDescEl.textContent = foundEvent.description;
            
            
            if (eventImageEl && foundEvent.image) {
                eventImageEl.src = foundEvent.image;
                eventImageEl.style.display = "block";
            }
        } else {
            eventTitleEl.textContent = "الفعالية غير موجودة";
            eventDateLocEl.textContent = "";
            eventDescEl.textContent = "عذراً، لم نتمكن من العثور على الفعالية المطلوبة.";
            if (eventImageEl) {
                eventImageEl.style.display = "none"; 
            }
        }
    }

    const contactForm = document.getElementById("contact-form");
    const formAlert = document.getElementById("form-alert");

    if (contactForm && formAlert) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const message = document.getElementById("message").value.trim();

            if (name && email && message) {
                formAlert.className = "alert alert-success";
                formAlert.textContent = "تم إرسال رسالتك بنجاح! شكراً لتواصلك معنا.";
                formAlert.classList.remove("d-none");
                contactForm.reset();
            } else {
                formAlert.className = "alert alert-danger";
                formAlert.textContent = "يرجى تعبئة كافة الحقول المطلوبة بشكل صحيح.";
                formAlert.classList.remove("d-none");
            }
        });
    }
});