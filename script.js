document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const mobileOverlay = document.getElementById('mobile-nav-overlay');
    const mobileClose = document.getElementById('mobile-close');

    if (hamburger && mobileOverlay && mobileClose) {
        hamburger.addEventListener('click', () => {
            mobileOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        mobileClose.addEventListener('click', () => {
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });

        mobileOverlay.addEventListener('click', (e) => {
            if (e.target === mobileOverlay) {
                mobileOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // 2. Filter Dropdown Interaction
    const filterItems = document.querySelectorAll('.filter-item:not(.sort-item)');
    const activeFiltersContainer = document.getElementById('active-filters');
    
    function updateFilterValueText(selectElement) {
        const filterItem = selectElement.closest('.filter-item');
        const valueSpan = filterItem.querySelector('.filter-value');
        if (valueSpan) {
            const selectedText = selectElement.options[selectElement.selectedIndex].text;
            valueSpan.textContent = selectedText;
        }
    }

    // Initialize all filter dropdowns
    document.querySelectorAll('.filter-item select').forEach(select => {
        // Set initial text
        updateFilterValueText(select);
        
        select.addEventListener('change', function() {
            updateFilterValueText(this);
            if (!this.closest('.sort-item')) {
                renderActiveFilters();
            }
        });
    });

    // 3. Brand Tab Click
    const brandTabs = document.querySelectorAll('.brand-tab');
    
    brandTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active from all tabs
            brandTabs.forEach(t => t.classList.remove('active'));
            // Add active to clicked tab
            this.classList.add('active');
            
            const targetId = this.getAttribute('data-target');
            
            if (targetId === 'all') {
                // Scroll to top of products or show all (in this layout, we just scroll to first section)
                const firstSection = document.querySelector('.brand-section');
                if (firstSection) {
                    firstSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            } else {
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    // Calculate header height to offset scroll
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // 4 & 5. Filter Tag Generation, Remove & Clear All
    function renderActiveFilters() {
        if (!activeFiltersContainer) return;
        
        // Find all active filters (where selected index > 0)
        const activeSelects = Array.from(filterItems)
            .map(item => item.querySelector('select'))
            .filter(select => select && select.selectedIndex > 0);
        
        if (activeSelects.length === 0) {
            activeFiltersContainer.style.display = 'none';
            return;
        }
        
        activeFiltersContainer.style.display = 'flex';
        
        const labelHTML = '<span class="filter-label">Bộ lọc đang chọn:</span>';
        let tagsHTML = '';
        
        activeSelects.forEach((select, index) => {
            const text = select.options[select.selectedIndex].text;
            const selectId = `filter-select-${index}`;
            select.dataset.filterId = selectId; 
            tagsHTML += `
                <div class="filter-tag">
                    <span>${text}</span>
                    <button class="remove-tag" data-target-id="${selectId}"><i class="fa-solid fa-xmark"></i></button>
                </div>
            `;
        });
        
        const clearBtnHTML = '<a href="#" class="clear-filters" id="clear-filters">Xóa tất cả</a>';
        activeFiltersContainer.innerHTML = labelHTML + tagsHTML + clearBtnHTML;
        
        // Bind events to new remove buttons
        const removeBtns = activeFiltersContainer.querySelectorAll('.remove-tag');
        removeBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const targetId = this.getAttribute('data-target-id');
                const targetSelect = document.querySelector(`select[data-filter-id="${targetId}"]`);
                if (targetSelect) {
                    targetSelect.selectedIndex = 0;
                    updateFilterValueText(targetSelect);
                    renderActiveFilters();
                }
            });
        });
        
        // Bind clear all
        const clearFiltersBtn = document.getElementById('clear-filters');
        if (clearFiltersBtn) {
            clearFiltersBtn.addEventListener('click', function(e) {
                e.preventDefault();
                activeSelects.forEach(select => {
                    select.selectedIndex = 0;
                    updateFilterValueText(select);
                });
                renderActiveFilters();
            });
        }
    }
    
    // Initial render
    renderActiveFilters();

    // 6. Back to Top Button
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 7. Product Wishlist Toggle
    const wishlistBtns = document.querySelectorAll('.btn-wishlist');
    
    wishlistBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            this.classList.toggle('active');
            const icon = this.querySelector('i');
            if (this.classList.contains('active')) {
                icon.classList.remove('fa-regular');
                icon.classList.add('fa-solid');
            } else {
                icon.classList.remove('fa-solid');
                icon.classList.add('fa-regular');
            }
        });
    });

    // 8. Sticky Header Shadow on Scroll
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});
