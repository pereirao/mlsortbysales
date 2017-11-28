// ==UserScript==
// @name         Mercado Livre - Ordena por vendidos
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Cria um botão na página de resultados que ordena os produtos pela quantidade de ítens vendidos!
// @author       Alexandre Pereira (pereirao)
// @match        https://*.mercadolivre.com.br/*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js
// @grant        none
// ==/UserScript==

var mlsort = {

    qty: function(e) {
        var q = 0;
        if(e.search("vendido")) {
            q = parseInt(e.split(" ")[1]);
            q = q > 0 ? q : 0;
        }
        return q;
    },

    sort: function() {
        var q = $(".results-item").length;
        while(q > 0) {
            for(j = 0; j < q; j++) {
                var m = mlsort.qty($(".results-item:eq("+j+") .item__condition").text());
                var n = mlsort.qty($(".results-item:eq("+(j+1)+") .item__condition").text());
                if(m < n) {
                    $(".results-item:eq("+j+")").insertAfter($(".results-item:eq("+(j+1)+")"));
                }
            }
            q--;
        }
    },

    init: function() {
        if($(".results-item").length > 0) {
            $('<div/>', {
                id: 'sortBySales',
                text: 'Vendidos',
                css: {
                    'position': 'fixed',
                    'top': '95vh',
                    'left': '95vw',
                    'display': 'inline-block',
                    'padding': '10px',
                    'background-color': '#FFF059',
                    'color': 'black',
                    'font-size': '1em',
                    'border-radius': '8px',
                    'cursor': 'pointer'
                }
            }).appendTo('.nav-header').on('click', function() {
                mlsort.sort();
            });
        }
    },
};

$(document).ready(function() {
    mlsort.init();
});

