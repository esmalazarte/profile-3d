const converter = new showdown.Converter()

// Creates a 2D html view from a markdown file (useful for long posts)
AFRAME.registerComponent('view-detailed', {
    schema: {
        path_to_md: {type: 'string', default: ''}
    },

    init: async function () {
        let popup = document.querySelector('#popup')
        let pop_content = document.querySelector('#popup-content')

        // Read Markdown file
        let md_file = await fetch(this.data.path_to_md);
        let md_text = await md_file.text();

        // Convert Markdown to HTML
        pop_content.innerHTML = converter.makeHtml(md_text)

        // Show popup when element is clicked
        this.el.addEventListener('click', function(){
            popup.classList.toggle("show");
            document.exitPointerLock();
        })

        // Close popup when clicked outside area
        window.addEventListener("click", function (event) {
            if (event.target == popup) {
                popup.classList.remove("show");
            }
        });
    },
});
