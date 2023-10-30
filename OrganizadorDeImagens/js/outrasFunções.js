closeAddContainer()

function closeAddContainer(){
    const AddContainer = document.querySelector("[data-close-add-container]")
    const section = document.querySelector(".add_container")
    AddContainer.addEventListener('click', ()=>{
       section.classList.toggle('add_container_close')
       section.classList.toggle('add_container_open')

       AddContainer.classList.toggle('close_add_container_bnt_close')
       AddContainer.classList.toggle('close_add_container_bnt_open')
    })
}