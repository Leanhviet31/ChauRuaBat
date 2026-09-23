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

    // 2. Filter Dropdown Interaction (simulate styling for focus if needed, standard select used in HTML)
    // The standard <select> handles dropdown open/close natively.
    // If you want to style the wrapper on focus:
    const filterSelects = document.querySelectorAll('.filter-select select');
    filterSelects.forEach(select => {
        select.addEventListener('focus', function() {
            this.parentElement.style.borderColor = 'var(--primary)';
        });
        select.addEventListener('blur', function() {
            this.parentElement.style.borderColor = 'var(--border)';
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

    // 4 & 5. Filter Tag Remove & Clear All
    const activeFiltersContainer = document.getElementById('active-filters');
    const removeTagBtns = document.querySelectorAll('.remove-tag');
    const clearFiltersBtn = document.getElementById('clear-filters');

    function checkActiveFilters() {
        const remainingTags = activeFiltersContainer.querySelectorAll('.filter-tag');
        if (remainingTags.length === 0) {
            activeFiltersContainer.style.display = 'none';
        }
    }

    removeTagBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            this.parentElement.remove();
            checkActiveFilters();
        });
    });

    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const tags = activeFiltersContainer.querySelectorAll('.filter-tag');
            tags.forEach(tag => tag.remove());
            checkActiveFilters();
        });
    }

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
