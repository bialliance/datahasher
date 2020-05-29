function sendForm(file) {
    var formData = new FormData();
    var imagefile = document.querySelector(file);
    formData.append("file", imagefile.files[0]);
    return axios.post('upload_file', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}