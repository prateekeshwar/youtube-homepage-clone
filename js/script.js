// YouTube Homepage Clone - Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const searchForm = document.querySelector('.search-form');
    const searchInput = document.querySelector('.search-input');
    const menuBtn = document.querySelector('.menu-btn');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    const contentMessage = document.querySelector('.content-message');
    const videoGrid = document.querySelector('.video-grid');

    // Search functionality
    if (searchForm && searchInput) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleSearch();
        });
    }

    // Menu toggle for mobile
    if (menuBtn && sidebar) {
        menuBtn.addEventListener('click', function() {
            toggleSidebar();
        });
    }

    // Voice search button (placeholder functionality)
    const voiceSearchBtn = document.querySelector('.voice-search-btn');
    if (voiceSearchBtn) {
        voiceSearchBtn.addEventListener('click', function() {
            handleVoiceSearch();
        });
    }

    // Navigation link interactions
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            handleNavigation(this);
        });
    });

    // Handle window resize for responsive behavior
    window.addEventListener('resize', function() {
        handleResize();
    });

    // Initialize responsive behavior
    handleResize();

    /**
     * Handle search form submission
     */
    function handleSearch() {
        try {
            const searchTerm = searchInput.value.trim();
            
            if (!searchTerm) {
                console.log('Search Error: Please enter a search term');
                showSearchError('Please enter a search term');
                return;
            }

            console.log(`Searching for: "${searchTerm}"`);
            
            // Simulate search results by showing video grid
            showSearchResults(searchTerm);
            
            // Clear search input
            searchInput.value = '';
            
        } catch (error) {
            console.error('Search Error:', error);
            showSearchError('An error occurred while searching');
        }
    }

    /**
     * Show search results (simulated)
     */
    function showSearchResults(searchTerm) {
        // Hide the initial message
        if (contentMessage) {
            contentMessage.style.display = 'none';
        }

        // Show video grid with sample results
        if (videoGrid) {
            videoGrid.style.display = 'grid';
            
            // Clear existing content
            videoGrid.innerHTML = '';
            
            // Generate sample video cards
            for (let i = 1; i <= 12; i++) {
                const videoCard = createVideoCard(searchTerm, i);
                videoGrid.appendChild(videoCard);
            }
        }
    }

    /**
     * Create a sample video card
     */
    function createVideoCard(searchTerm, index) {
        const card = document.createElement('div');
        card.className = 'video-card';
        
        card.innerHTML = `
            <div class="video-thumbnail">
                <div class="thumbnail-placeholder">Video Thumbnail ${index}</div>
            </div>
            <div class="video-info">
                <h3 class="video-title">${searchTerm} - Sample Video ${index}</h3>
                <p class="video-channel">Sample Channel ${index}</p>
                <p class="video-meta">${Math.floor(Math.random() * 1000)}K views • ${Math.floor(Math.random() * 7) + 1} days ago</p>
            </div>
        `;
        
        // Add click handler for video card
        card.addEventListener('click', function() {
            console.log(`Clicked on video: ${searchTerm} - Sample Video ${index}`);
        });
        
        return card;
    }

    /**
     * Show search error message
     */
    function showSearchError(message) {
        // Create or update error message
        let errorDiv = document.querySelector('.search-error');
        
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'search-error';
            errorDiv.style.cssText = `
                position: fixed;
                top: 70px;
                left: 50%;
                transform: translateX(-50%);
                background-color: #ff4444;
                color: white;
                padding: 12px 24px;
                border-radius: 4px;
                font-size: 14px;
                z-index: 1001;
                opacity: 0;
                transition: opacity 0.3s;
            `;
            document.body.appendChild(errorDiv);
        }
        
        errorDiv.textContent = message;
        errorDiv.style.opacity = '1';
        
        // Hide error after 3 seconds
        setTimeout(() => {
            errorDiv.style.opacity = '0';
            setTimeout(() => {
                if (errorDiv.parentNode) {
                    errorDiv.parentNode.removeChild(errorDiv);
                }
            }, 300);
        }, 3000);
    }

    /**
     * Toggle sidebar visibility (mobile)
     */
    function toggleSidebar() {
        if (sidebar) {
            sidebar.classList.toggle('open');
        }
    }

    /**
     * Handle voice search (placeholder)
     */
    function handleVoiceSearch() {
        console.log('Voice search clicked (feature not implemented)');
        
        // Show a temporary message
        const message = document.createElement('div');
        message.textContent = 'Voice search not available';
        message.style.cssText = `
            position: fixed;
            top: 70px;
            left: 50%;
            transform: translateX(-50%);
            background-color: #333;
            color: white;
            padding: 8px 16px;
            border-radius: 4px;
            font-size: 12px;
            z-index: 1001;
        `;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            if (message.parentNode) {
                message.parentNode.removeChild(message);
            }
        }, 2000);
    }

    /**
     * Handle navigation link clicks
     */
    function handleNavigation(link) {
        // Remove active class from all nav items
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => item.classList.remove('active'));
        
        // Add active class to clicked item
        const parentItem = link.closest('.nav-item');
        if (parentItem) {
            parentItem.classList.add('active');
        }
        
        const navText = link.querySelector('.nav-text');
        const sectionName = navText ? navText.textContent : 'Unknown';
        
        console.log(`Navigated to: ${sectionName}`);
        
        // Reset to initial state when clicking Home
        if (sectionName === 'Home') {
            resetToInitialState();
        }
    }

    /**
     * Reset to initial state (showing welcome message)
     */
    function resetToInitialState() {
        if (contentMessage) {
            contentMessage.style.display = 'block';
        }
        
        if (videoGrid) {
            videoGrid.style.display = 'none';
            videoGrid.innerHTML = '';
        }
    }

    /**
     * Handle window resize for responsive behavior
     */
    function handleResize() {
        const width = window.innerWidth;
        
        // Close sidebar on mobile when resizing to larger screen
        if (width > 768 && sidebar && sidebar.classList.contains('open')) {
            sidebar.classList.remove('open');
        }
    }

    /**
     * Keyboard shortcuts
     */
    document.addEventListener('keydown', function(e) {
        // Focus search input when pressing '/' key
        if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            if (searchInput) {
                searchInput.focus();
            }
        }
        
        // Escape key to close sidebar on mobile
        if (e.key === 'Escape') {
            if (sidebar && sidebar.classList.contains('open')) {
                sidebar.classList.remove('open');
            }
        }
    });

    // Add search input focus/blur effects
    if (searchInput) {
        searchInput.addEventListener('focus', function() {
            const container = this.closest('.search-container');
            if (container) {
                container.style.borderColor = '#065fd4';
            }
        });
        
        searchInput.addEventListener('blur', function() {
            const container = this.closest('.search-container');
            if (container) {
                container.style.borderColor = '#cccccc';
            }
        });
    }

    console.log('YouTube Homepage Clone initialized successfully');
});

// Error handling for the entire script
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled Promise Rejection:', e.reason);
});
