const panels = document.querySelectorAll('.panel');

    function zoomIn() {
      this.classList.add('zoom');
    };

    function zoomOut() {
        this.classList.remove('zoom');
      }

    panels.forEach(panel => panel.addEventListener('mouseover', zoomIn));
    panels.forEach(panel => panel.addEventListener('mouseout', zoomOut));