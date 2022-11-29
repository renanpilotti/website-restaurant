//fluxo de compra
$('.section, .pedido').hide();

$('.massa').click(function () {
    selecionaItem(this);
    $('.section:first').show(1000);
    setTimeout(() => $(document).scrollTop($(document).height()), 300)
})


$('.molho').click(function () {
    selecionaItem(this);
    $('.section:last').show(1000);
    setTimeout(() => $(document).scrollTop($(document).height()), 300)
})

$('.bebida').click(function () {
    selecionaItem(this);
    $('.btn-add').removeClass('disabled');
})

let valTotal = Number($('.total').text().replace(',', '.'))
let contador = 0;

$('.btn-add').click(function () {
    let massa = $('.active.massa p:first').text();
    let precoMassa = $('.active.massa p:last').text();

    let molho = $('.active.molho p:first').text();
    let precoMolho = $('.active.molho p:last').text();

    let bebida = $('.active.bebida p:first').text();
    let precoBebida = $('.active.bebida p:last').text();

    //adiciona itens na lista
    $('.list-group').prepend(retornaElem(massa, molho, bebida, precoMassa, precoMolho, precoBebida));

    //atualiza soma total
    $('.total').text(valTotal.toFixed(2).toString().replace('.', ','));

    //mostra pedido e atualiza contador
    $('.pedido').show(1000);
    $('.contador').text(contador);

    //reinicia fluxo
    $('.food').removeClass('active nao-selecionado');
    $('.section').hide();
    $('.btn-add').addClass('disabled');
})

//função que recebe strings e as transforma em número, realiza somas e retorna elementos HTML
function retornaElem(massa, molho, bebida, precoMassa, precoMolho, precoBebida) {

    let priceOne = Number(precoMassa.replace('R$', '').replace(',', '.'));
    let priceTwo = Number(precoMolho.replace('+ R$', '').replace(',', '.'));
    let priceThree = Number(precoBebida.replace('+ R$', '').replace(',', '.'));

    valTotal += priceOne + priceTwo + priceThree;

    if (priceThree === 0) {
        contador++;
        return (`
        <li class="list-group-item d-flex justify-content-between lh-sm">
            <div>
                <h6 class="my-0">${massa}</h6>
                <small class="text-muted">${molho}</small>
            </div>
            <span class="text-muted">
                R$ ${(priceOne + priceTwo).toFixed(2).toString().replace('.', ',')}
            </span>
        </li>
    `);
    } else {
        contador += 2;
        return (`
            <li class="list-group-item d-flex justify-content-between lh-sm">
                <div>
                    <h6 class="my-0">${massa}</h6>
                    <small class="text-muted">${molho}</small>
                </div>
                <span class="text-muted">
                    R$ ${(priceOne + priceTwo).toFixed(2).toString().replace('.', ',')}
                </span>
            </li>
            <li class="list-group-item d-flex justify-content-between lh-sm">
                <div>
                    <h6 class="my-0">${bebida}</h6>
                    <small class="text-muted">350 mL</small>
                </div>
                <span class="text-muted">R$ ${priceThree.toFixed(2).toString().replace('.', ',')}</span>
            </li>
        `);
    }
}

//função para marcar o item selecionado
function selecionaItem(param) {
    $(param).siblings().addClass('nao-selecionado');
    $(param).siblings().removeClass('active');
    $(param).removeClass('nao-selecionado');
    $(param).addClass('active');
}