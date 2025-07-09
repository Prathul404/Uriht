document.addEventListener('DOMContentLoaded', function() {
    const appointmentsTable = document.getElementById('appointmentsTable');
    const galleryGrid = document.getElementById('galleryGrid');
    const uploadModal = new bootstrap.Modal(document.getElementById('uploadModal'));
    const uploadButton = document.getElementById('uploadButton');

    // Sample appointments data (in a real app, this would come from a backend)
    const appointments = [
        {
            id: 1,
            name: 'Sarah Johnson',
            service: 'Haircut & Styling',
            gender: 'female',
            date: '2025-07-10',
            reason: 'Want to try a new hairstyle',
            photo: 'https://source.unsplash.com/400x300/?salon+female',
            status: 'pending'
        },
        {
            id: 2,
            name: 'John Smith',
            service: 'Beard Trim',
            gender: 'male',
            date: '2025-07-11',
            reason: 'Regular maintenance',
            photo: 'https://source.unsplash.com/400x300/?salon+male',
            status: 'confirmed'
        }
    ];

    // Sample gallery images
    const galleryImages = [
        {
            id: 1,
            title: 'Female Haircut',
            category: 'female',
            url: 'https://source.unsplash.com/800x600/?salon+female'
        },
        {
            id: 2,
            title: 'Male Haircut',
            category: 'male',
            url: 'https://source.unsplash.com/800x600/?salon+male'
        }
    ];

    // Populate appointments table
    function populateAppointments() {
        appointmentsTable.innerHTML = '';
        appointments.forEach(appointment => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${appointment.name}</td>
                <td>${appointment.service}</td>
                <td>${appointment.gender}</td>
                <td>${appointment.date}</td>
                <td>${appointment.reason}</td>
                <td>
                    ${appointment.photo ? `<img src="${appointment.photo}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 5px;">` : 'No photo'}
                </td>
                <td><span class="status-badge status-${appointment.status}">${appointment.status}</span></td>
                <td>
                    <button class="btn btn-sm btn-success" onclick="confirmAppointment(${appointment.id})">Confirm</button>
                    <button class="btn btn-sm btn-danger" onclick="cancelAppointment(${appointment.id})">Cancel</button>
                </td>
            `;
            appointmentsTable.appendChild(row);
        });
    }

    // Populate gallery grid
    function populateGallery() {
        galleryGrid.innerHTML = '';
        galleryImages.forEach(image => {
            const item = document.createElement('div');
            item.className = 'col-md-4 gallery-item';
            item.innerHTML = `
                <img src="${image.url}" alt="${image.title}">
                <div class="actions">
                    <i class="fas fa-trash-alt text-danger" onclick="deleteImage(${image.id})"></i>
                </div>
            `;
            galleryGrid.appendChild(item);
        });
    }

    // Handle appointment actions
    function confirmAppointment(id) {
        const appointment = appointments.find(a => a.id === id);
        if (appointment) {
            appointment.status = 'confirmed';
            populateAppointments();
            Swal.fire('Success!', 'Appointment confirmed!', 'success');
        }
    }

    function cancelAppointment(id) {
        Swal.fire({
            title: 'Are you sure?',
            text: 'This will cancel the appointment.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, cancel it'
        }).then((result) => {
            if (result.isConfirmed) {
                const appointment = appointments.find(a => a.id === id);
                if (appointment) {
                    appointment.status = 'cancelled';
                    populateAppointments();
                    Swal.fire('Cancelled!', 'Appointment has been cancelled.', 'success');
                }
            }
        });
    }

    // Handle image upload
    uploadButton.addEventListener('click', function() {
        const form = document.getElementById('uploadForm');
        const formData = new FormData(form);
        
        // In a real app, this would send data to a backend
        // Here we'll just add it to our galleryImages array
        const newImage = {
            id: galleryImages.length + 1,
            title: formData.get('title'),
            category: formData.get('category'),
            url: formData.get('file') // In real app, this would be the uploaded file URL
        };
        
        galleryImages.push(newImage);
        populateGallery();
        uploadModal.hide();
        
        Swal.fire('Success!', 'Image uploaded successfully!', 'success');
        form.reset();
    });

    // Initialize the dashboard
    populateAppointments();
    populateGallery();

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
