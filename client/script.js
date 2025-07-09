document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.getElementById('bookingForm');
    const dateInput = document.querySelector('input[type="date"]');
    const serviceSelect = document.getElementById('serviceSelect');
    const genderSelect = document.querySelector('select[required]');
    const galleryContainer = document.querySelector('#gallery .row');

    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);

    // Sample gallery images
    const galleryImages = [
        'https://source.unsplash.com/800x600/?salon+female',
        'https://source.unsplash.com/800x600/?salon+male',
        'https://source.unsplash.com/800x600/?salon+hair',
        'https://source.unsplash.com/800x600/?salon+beauty'
    ];

    // Populate gallery
    galleryImages.forEach(imgUrl => {
        const img = document.createElement('div');
        img.className = 'col-md-3';
        img.innerHTML = `<img src="${imgUrl}" class="gallery-image" alt="Salon Service">`;
        galleryContainer.appendChild(img);
    });

    // Populate services based on gender selection
    genderSelect.addEventListener('change', function() {
        const selectedGender = this.value;
        serviceSelect.innerHTML = '<option value="">Choose a service...</option>';

        if (selectedGender === 'female') {
            const femaleServices = [
                'Haircut & Styling',
                'Hair Coloring',
                'Facial Treatment',
                'Manicure & Pedicure',
                'Bridal Makeup'
            ];
            femaleServices.forEach(service => {
                const option = document.createElement('option');
                option.value = service.toLowerCase().replace(/\s+/g, '-');
                option.textContent = service;
                serviceSelect.appendChild(option);
            });
        } else if (selectedGender === 'male') {
            const maleServices = [
                'Haircut & Trim',
                'Beard Styling',
                'Hot Shave',
                'Head Massage',
                'Facial Treatment'
            ];
            maleServices.forEach(service => {
                const option = document.createElement('option');
                option.value = service.toLowerCase().replace(/\s+/g, '-');
                option.textContent = service;
                serviceSelect.appendChild(option);
            });
        }
    });

    // Form submission handler
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(bookingForm);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // Show success message
        Swal.fire({
            title: 'Success!',
            text: 'Your appointment has been booked successfully! We will notify the salon owner.',
            icon: 'success',
            confirmButtonText: 'OK'
        }).then(() => {
            // Reset form
            bookingForm.reset();
            // Set date back to minimum
            dateInput.value = '';
            // Reset service selection
            serviceSelect.innerHTML = '<option value="">Choose a service...</option>';
        });
    });

    // Add smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
