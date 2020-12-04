function populateUf(){
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then( states => {
        for(const state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}

populateUf()

document.querySelector("select[name=uf]")
.addEventListener("change", getCities)

function getCities(event){
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value
    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then( res => res.json() )
    .then( cities => {
        for(const city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false
    })
}

//itens de coleta
const itemsToCollect = document.querySelectorAll(".items-grid li")

for(const item of itemsToCollect){
    item.addEventListener("click", handleSelectItem)
}

const collectedItens = document.querySelectorAll("input[name=itens]")
let selectedItens = []

function handleSelectItem(event){
    const itemLi = event.target

    //add or remove
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    const alreadySelected = selectedItens.findIndex(item =>{
        const itemFound = item == itemId
        return itemFound
    })

    if(alreadySelected >= 0){
        const filteredItens = selectedItens.filter( item =>{
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        selectedItens = filteredItens
    } else{
        selectedItens.push(itemId)
    }

    collectedItens.value = (selectedItens)
}