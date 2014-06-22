(function () {

    function Pager(reviewList, itemsPerPage) {
        this.reviewList = reviewList;
        this.itemsPerPage = itemsPerPage;
        this.currentPage = 1;
        this.pages = 0;
        this.inited = false;
    }

    Pager.prototype = {

        showRecords: function(from, to) {        
            var rows = document.getElementById(this.reviewList).children,
                length = rows.length,
                i;

            for (i = 1; i < length; i++) {
                if (i < from || i > to)  
                    rows[i].style.display = 'none';
                else
                    rows[i].style.display = '';
            }
        },
        
        showPage: function(pageNumber) {
            var from, to;

            if (! this.inited) {
                alert("not inited");
                return;
            }

            from = (pageNumber - 1) * this.itemsPerPage + 1;
            to = from + this.itemsPerPage - 1;
            this.showRecords(from-1, to-1);
        },

        showPageNo: function (pageNumber) {
            document.getElementById('pageNo').innerHTML = 'Page' + this.currentPage  + '/' + this.pages;
        },
        
        prev: function() {
            if (this.currentPage > 1) {
                this.showPage(this.currentPage - 1);
                this.currentPage -= 1;
                this.showPageNo(this.currentPage);
            }
        },
        
        next: function() {
            if (this.currentPage < this.pages) {
                this.showPage(this.currentPage + 1);
                this.currentPage += 1;
                this.showPageNo(this.currentPage);
            }
        },                        
        
        init: function() {
            var rows = document.getElementById(this.reviewList).children;
            var records = (rows.length - 1); 
            this.pages = Math.ceil(records / this.itemsPerPage);
            this.inited = true;
            this.attachEventListener();
        },

        attachEventListener: function () {
            var p = document.getElementById('showPrev'),
                n = document.getElementById('showNext'),
                s = document.getElementById('sortReviewList');

            p.addEventListener('click', this.prev.bind(this));
            n.addEventListener('click', this.next.bind(this));
            s.addEventListener('click', this.sortList.bind(this, 0, 1));
        },

        sortList: function (col_no, asc) {
            var rows = document.getElementById(this.reviewList).children,
                rlen = rows.length,
                arr = new Array(),
                i, j, cells, clen;
            for (i = 0; i < rlen; i++) {
                cells = rows[i].children;
                clen = cells.length;
                arr[i] = new Array();
                for (j = 0; j < clen; j++) {
                    arr[i][j] = cells[j].innerHTML;
                }
            }
            arr.sort(function (a, b) {
                return (a[col_no] === b[col_no]) ? 0 : ((a[col_no] > b[col_no]) ? asc : -1 * asc);
            });
            for (i = 0; i < rlen; i++) {
                rows[i].innerHTML = '<strong class="review_score">'+arr[i][0]+'</strong><blockquote class="review_content">'+arr[i][1]+'</blockquote>';
            }
        }
    };       
        
    (function () {
        var main = new Pager('reviews_list', 5);
        main.init();
        main.showPage(1);
        main.showPageNo(1);

    })();

})();


