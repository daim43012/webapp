document.getElementById('clickable-image').addEventListener('click', function() {
    this.classList.add('clicked');
    setTimeout(() => this.classList.remove('clicked'), 200); 
});
