document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('addStudentForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const age = document.getElementById('age').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;

        let missingFields = [];

        if (name.trim() === '') {
            missingFields.push('Full Name');
        }

        if (age.trim() === '') {
            missingFields.push('Age');
        }

        if (email.trim() === '') {
            missingFields.push('Email');
        }

        if (phone.trim() === '') {
            missingFields.push('Phone Number');
        }

        if (missingFields.length > 0) {
            swal('Error', 'Please fill out the following fields: ' + missingFields.join(', '), 'error');
            return;
        }

        form.submit();
    });

    function confirmDelete(id) {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this record!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                // If user confirms deletion, submit the form
                document.querySelector(`#deleteForm_${id}`).submit();
            }
        });
    }

    // Assign confirmDelete function to all delete buttons
    const deleteButtons = document.querySelectorAll('.delete-button');
    deleteButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const id = this.dataset.id;
            confirmDelete(id);
        });
    });

    // Add a click event listener to close the flash message when 'x' is clicked
    const closeButtons = document.querySelectorAll('.alert .close');
    closeButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            this.parentElement.style.display = 'none';
        });
    });

   // Add event listener for update button
    const updateButtons = document.querySelectorAll('.update-button');
    updateButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const id = this.dataset.id;
            const name = this.dataset.name;
            const age = this.dataset.age;
            const email = this.dataset.email;
            const phone = this.dataset.phone;

            // Set the values in the modal
            document.getElementById('updateId').value = id;
            document.getElementById('updateName').value = name;
            document.getElementById('updateAge').value = age;
            document.getElementById('updateEmail').value = email;
            document.getElementById('updatePhone').value = phone;

            // Show the update modal
            $('#updateModal').modal('show');
        });
    });

    const updateForm = document.getElementById('updateStudentForm');

    updateForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const id = document.getElementById('updateId').value;
        const name = document.getElementById('updateName').value;
        const age = document.getElementById('updateAge').value;
        const email = document.getElementById('updateEmail').value;
        const phone = document.getElementById('updatePhone').value;

        if (name.trim() === '' || age.trim() === '' || email.trim() === '' || phone.trim() === '') {
            swal('Error', 'All fields must be filled out.', 'error');
            return;
        }

        // Check if any data has changed
        const originalName = this.dataset.originalName;
        const originalAge = this.dataset.originalAge;
        const originalEmail = this.dataset.originalEmail;
        const originalPhone = this.dataset.originalPhone;

        if (name === originalName && age === originalAge && email === originalEmail && phone === originalPhone) {
            swal('Error', 'No changes detected.', 'error');
            return;
        }

        this.submit();
    });

});
