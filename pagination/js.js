(function () {  
    "use strict";

    function Pager(reviewList, itemsPerPage) {
        this.reviewList = {};
        this.itemsPerPage = itemsPerPage;
        this.currentPage = 1;
        this.pages = 0;
    }

    Pager.prototype = {

        showRecords: function (from, to) {        
            var oThis = this,
                records = oThis.reviewList.reviews,
                length = records.length,
                parentEl = document.getElementById("reviews_list"),
                childs = document.getElementsByClassName("one_review"),
                i;
                
            parentEl.innerHTML = "";
            for (i = from; i < to; i++) {
                oThis._createAList(records[i], parentEl);
            }
        },

        _createAList: function (record, parentEl) {
            var li = document.createElement("li"),
                strong = document.createElement("strong"),
                blockquote = document.createElement("blockquote"),
                cite = document.createElement("cite");

            li.className = "one_review";
            strong.className = "review_score";
            strong.innerHTML = record.reviewScore;
            blockquote.className = "review_content";
            blockquote.innerHTML = record.reviewContent;
            cite.innerHTML = record.cite;

            blockquote.appendChild(cite);
            li.appendChild(strong);
            li.appendChild(blockquote);

            parentEl.appendChild(li);
        },
        
        showPage: function(pageNumber) {
            var oThis = this, 
                from, to;

            from = (pageNumber - 1) * oThis.itemsPerPage + 1;
            to = pageNumber * oThis.itemsPerPage;
            oThis.showRecords(from, to);
        },

        showPageNo: function (pageNumber) {
            document.getElementById('pageNo').innerHTML = 'Page' + this.currentPage  + '/' + this.pages;
        },
        
        prev: function() {
            var oThis = this;

            if (oThis.currentPage > 1) {
                oThis.showPage(this.currentPage - 1);
                oThis.currentPage -= 1;
                oThis.showPageNo(this.currentPage);
            }
        },  
        
        next: function() {
            var oThis = this;

            if (oThis.currentPage < oThis.pages) {
                oThis.showPage(oThis.currentPage + 1);
                oThis.currentPage += 1;
                oThis.showPageNo(oThis.currentPage);
            }
        }, 

        getReviewList: function (callback) {
            var myReq,
                oThis = this;
            if(window.XMLHttpRequest) {
                myReq = new XMLHttpRequest();
            } else {
                myReq = new ActiveXObject("Microsoft.XMLHTTP");
            }
            myReq.open("GET", "reviewList.json", true);
            myReq.send();
            myReq.onreadystatechange = function() {
                if (myReq.readyState == 4) {
                    if (myReq.status == 200) {
                        oThis.reviewList = JSON.parse(myReq.responseText);
                        oThis._doCal();
                        oThis.showPage(1);
                        oThis.showPageNo(1);
                    }
                }
            }          
        },    

        _doCal: function () {
            var oThis = this,
                records;

            records = this.reviewList.reviews.length;             
            oThis.pages = Math.ceil(records / oThis.itemsPerPage);
            oThis.inited = true;
            oThis.attachEventListener();
        },                    
        
        init: function() {
            var oThis = this,
                records;

            oThis.getReviewList();               
        },

        attachEventListener: function () {
            var p = document.getElementById('showPrev'),
                n = document.getElementById('showNext'),
                s = document.getElementById('sortReviewList');

            p.addEventListener('click', this.prev.bind(this));
            n.addEventListener('click', this.next.bind(this));
            s.addEventListener('click', this.sortReviewList.bind(this, 0, 1));
        },

        sortReviewList: function (col_no, asc) {
            var oThis = this,
                pgNo;

            oThis.sortList()
            oThis._clearList();
            oThis.showPage(oThis.currentPage);
        },

        sortList: function () {
            var oThis = this;

            oThis.reviewList.reviews.sort(function compareNumbers(a, b) {
                return a.reviewScore - b.reviewScore;
            });
        },

        _clearList: function () {
            document.getElementById('reviews_list').innerHTML = "";
        }
    };       
        
    (function () {
        var main = new Pager('reviews_list', 5);
        main.init();
    })();

})();


    