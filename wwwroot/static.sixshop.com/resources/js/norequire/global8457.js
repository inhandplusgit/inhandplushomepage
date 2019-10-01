var trace = function (msg) {
    try {
        console.log(msg);
    } catch (e) {
//		$("body").prepend(" "  +msg)
    }
};

function callIframeFunction_loadWebFont(fontType, fontFamily) {
    if (fontType == "earlyAccess") {
        require("common/common").font.fontLoadInHeadStyle("earlyAccess", fontFamily.toString());
    } else if (fontType == "google") {
        WebFont.load({
            google: {families: fontFamily}
        });
    } else if (fontType == "sandoll") {
        require("common/common").font.fontLoadInHeadStyle("sandoll", fontFamily.toString());
    }
}

function callIframeFunction_textEditor(textEditType, changeValue, undo) {
    require("editor/textEditor").handleTextEvents(textEditType, changeValue, undo);
}

function callIframeFunction_changeTextItemContent(itemId) {
    if (parent.changeTextItemContent) {
        parent.changeTextItemContent(itemId, $(".item-element").html());
    }
}

function callIframeFunction_textEditor_event(eventType) {
    switch (eventType) {
        case "blur":
            window.getSelection().empty();
            require("common/common").selection.removeAllRanges();
            $(".item-element").blur();
            break;
        case "focus":
            $(".item-element").focus();
            break;
    }
}

function callIframeParentFunction_handleItemBeforeChange(itemId) {
    if (parent.handleItemBeforeChange) {
        parent.handleItemBeforeChange(itemId);
    }
}

function handleItemBeforeChange(itemId) {
    var itemWrapper = $("#" + itemId),
        selectedItem = require("data/data").getModel("item", itemWrapper.attr("cid"));

    require("editor/set").handleItemBeforeChange("change", selectedItem);
}

function callIframeParentFunction_changeItemHeight(itemId) {
    var itemHeight = 0;
    $(".item-element").children().each(function () {
        itemHeight += $(this).height() + require("common/common").getPureNumber($(this).css("margin-top")) + require("common/common").getPureNumber(
            $(this).css("margin-bottom"));
    });

    if (parent.getTextEditorHeight() != itemHeight) {
        parent.changeItemHeight(itemId, itemHeight);
        window.callIframeParentFunction_saveTextItem("withoutInit", true);
    }
}

function changeItemHeight(itemId, height) {
    $("#" + itemId).find("#textElementEditor").height(height);
}

function getTextEditorHeight() {
    return $("#textElementEditor").height();
}

function callIframeParentFunction_changeTextItemContent(itemId) {
    if (parent.changeTextItemContent) {
        var activeParagraph = $(".item-element").find(".activeParagraph").removeClass("activeParagraph");

        require("editor/textEditor").removeUnexpectedData();

        parent.changeTextItemContent(itemId, $(".item-element").html());

        activeParagraph.addClass("activeParagraph");
    }
}

function changeTextItemContent(itemId, textContent) {
    $("#" + itemId + " .item-element").html(textContent);
}

function callIframeParentFunction_closeSettingPanel() {
    if (parent.closeSettingPanel) {
        parent.closeSettingPanel();
    }
}

function closeSettingPanel() {
    require("editor/view").initiatePanel();
}

function callIframeParentFunction_sendFocusedElementInformation(startContainer, endContainer) {
    var startElementAncestorList = [],
        endElementAncestorList = [];

    var startElementAncestor = $(startContainer),
        endElementAncestor = $(endContainer);

    //while(!startElementAncestor.prop("tagName") || startElementAncestor.prop("tagName").toLowerCase() != "div") {
    while (!startElementAncestor.hasClass("item-element")) {
        startElementAncestorList.push(startElementAncestor);
        startElementAncestor = startElementAncestor.parent();
    }
//	while(!endElementAncestor.prop("tagName") || endElementAncestor.prop("tagName").toLowerCase() != "div") {
    while (!endElementAncestor.hasClass("item-element")) {
        endElementAncestorList.push(endElementAncestor);
        endElementAncestor = endElementAncestor.parent();
    }
    if (parent.sendFocusedElementInformation) {
        parent.sendFocusedElementInformation(startElementAncestorList, endElementAncestorList);
    }
}

function sendFocusedElementInformation(startElementAncestorList, endElementAncestorList) {
    require("editor/view").handleController.showElementController(
        {startElementAncestorList: startElementAncestorList, endElementAncestorList: endElementAncestorList});
}

function callIframeParentFunction_saveTextItem(saveType, undo) {
    if (parent.saveTextItem) {
        parent.saveTextItem(saveType, undo);
    }
}

function saveTextItem(saveType, undo) {
    require("editor/set").saveTextItem(saveType, undo);
}

function callIframeParentFunction_closePreview() {
    if (parent.closePreview) {
        parent.closePreview();
    }
}

function closePreview() {
    $("#preview").remove();
    $("#previewMessageWrapper").addClass("hide");
}

function enableMouseWheel() {
    require("common/common").mouseWheelEnable();
    $("body").css({overflow: "auto"});
}

function closeAddShopProduct() {
    enableMouseWheel();
    $("#iframe_addShopProduct, #iframe_editShopProduct").remove();
}

function closeAddShopSettingProductCommon() {
    enableMouseWheel();
    $("#iframe_addShopSettingProductCommon, #iframe_editShopSettingProductCommon").remove();
}

function closeShopCustomerDetail() {
    enableMouseWheel();
    $("#iframeDiv_shopCustomerDetail").remove();
}

function closeCustomizeSmsPage() {
    enableMouseWheel();
    $("#iframe_customizeSms").remove();
}

function closeAddonBizmTemplatePage() {
    enableMouseWheel();
    $("#iframe_addonBizmTemplateSetting").remove();
}

function closeAddonAlimtalkSmsSendHistoriesDetail() {
    enableMouseWheel();
    $("#iframe_addonAlimtalkSmsSendHistories").remove();
}

function closeShopOrderDetail() {
    enableMouseWheel();
    $("#iframeDiv_shopOrderDetail").remove();
}

function closeAddonDetail() {
    enableMouseWheel();
    $("#iframe_addonDetail").remove();
}

function closeAddPost() {
    enableMouseWheel();
    $("#iframe_addPost, #iframe_editPost").remove();
}

function closeAddBlogPost() {
    enableMouseWheel();
    $("#iframe_addBlogPost, #iframe_editBlogPost").remove();
}

function callIframeParentFunction_makeCustomerGradeNavi() {
    if (parent.makeCustomerGradeNavi) {
        return parent.makeCustomerGradeNavi();
    }
}

function makeCustomerGradeNavi(type) {
    return require("shop/shopOnSystem").customer().common.makeCustomerGradeNavi();
}

function callIframeParentFunction_getShopProductList(type) {
    if (parent.getShopProductList) {
        return parent.getShopProductList(type);
    }
}

function getShopProductList(type) {
    return require("site/data").shop.handleShopProduct.getShopProductList(type);
}

function callIframeParentFunction_addShopProductList(type, productNo) {
    if (parent.addShopProduct) {
        return parent.addShopProduct(type, productNo);
    }
}

function addShopProduct(type, productNo) {
    return require("site/data").shop.handleShopProduct.addShopProduct(type, productNo);
}

function callIframeParentFunction_makeModelFromDataAndAddToCollection(dataType, obj, callback) {
    if (parent.makeModelFromDataAndAddToCollection) {
        return parent.makeModelFromDataAndAddToCollection(dataType, obj, callback);
    }
}

function makeModelFromDataAndAddToCollection(dataType, obj, callback) {
    require("data/data").makeModelFromDataAndAddToCollection(dataType, obj, function (newModel) {
        if (callback) {
            callback(newModel);
        }
    });
}

function callIframeParentFunction_getModel(modelType, _id) {
    if (parent.getModel) {
        return parent.getModel(modelType, _id);
    }
}

function getModel(modelType, _id) {
    return require("data/data").getCollection(modelType).get(_id);
}

function callIframeParentFunction_setModel(obj, modelType, changeValue, callback) {
    if (parent.setModel) {
        parent.setModel(obj, modelType, changeValue, callback);
    }
}

function setModel(obj, modelType, changeValue, callback) {
    switch (modelType) {
        case "shopCategory":
            obj.set({productListInCategory: changeValue.get("productListInCategory")});
            obj.set({categoryName: changeValue.get("categoryName")});
            break;
        case "blogCategory":
            obj.set({blogCategoryName: changeValue.get("blogCategoryName")});
            obj.set({blogPostListInCategory: changeValue.get("blogPostListInCategory")});
            break;
        case "blogPost":
            obj.set({linkedBlogCategoryList: changeValue});
            break;
        case "shopProduct":
            obj.set({linkedCategoryList: changeValue});
            break;
        case "board":
            obj.set({postListInBoard: changeValue.get("postListInBoard")});
            obj.set({normalPostListInBoard: changeValue.get("normalPostListInBoard")});
            obj.set({noticePostListInBoard: changeValue.get("noticePostListInBoard")});
            obj.set({newPostListInBoard: changeValue.get("newPostListInBoard")});
            break;
        case "shopCustomer":
            obj.set({customerName: changeValue.get("customerName")});
            obj.set({customerPhone: changeValue.get("customerPhone")});
            obj.set({withdrawal: changeValue.get("withdrawal")});
            obj.set({customerGradeNo: changeValue.get("customerGradeNo")});
            break;
        case "shopCustomerGrade":
            obj.set({customerNoList: changeValue.get("customerNoList")});
            break;
        case "shopOrder":
            obj.set({orderStatus: changeValue.get("orderStatus")});
            obj.set({orderRefundError: changeValue.get("orderRefundError")});
            obj.set({orderRefundErrorMsg: changeValue.get("orderRefundErrorMsg")});
            obj.set({orderMemo: changeValue.get("orderMemo")});
            obj.set({confirmRefundEError: ""});
            if (callback) {
                callback(obj);
            }
            break;
    }
}

function callIframeParentFunction_getCollection(modelType) {
    if (parent.getCollection) {
        return parent.getCollection(modelType);
    }
}

function getCollection(modelType) {
    return require("data/data").getCollection(modelType);
}

function callIframeParentFunction_deleteShopProductAll(type) {
    if (parent.deleteShopProductAll) {
        return parent.deleteShopProductAll(type);
    }
}

function deleteShopProductAll(type) {
    return require("site/data").shop.handleShopProduct.deleteShopProductAll(type);
}

function callIframeParentFunction_drawDataInBrowser(drawType, displayType, dataType, obj, targetToAppend, callback) {
    if (parent.drawDataInBrowser) {
        return parent.drawDataInBrowser(drawType, displayType, dataType, obj, targetToAppend, callback);
    }
}

function drawDataInBrowser(drawType, displayType, dataType, obj, targetToAppend, callback) {
    switch (drawType) {
        case "shopSettingProductCommon":
        case "shopProduct":
            require("shop/shopProduct").view.drawDataInBrowser(displayType, dataType, obj, targetToAppend, function () {
                if (callback) {
                    callback();
                }
            });
            break;
        case "blogPost":
            require("blog/blogOnSystem").view.drawDataInBrowser(displayType, dataType, obj, targetToAppend, function () {
                if (callback) {
                    callback();
                }
            });
            break;
        /*case "focus":
            $(".item-element").focus();
            break;*/
    }
}

function callIframeParentFunction_userHomeEventingBinding() {
    if (parent.userHomeEventingBinding) {
        parent.userHomeEventingBinding();
    }
}

function userHomeEventingBinding() {
    require("userHome/home").eventBinding();
}

function callIframeParentFunction_setDialogTrigger() {
    if (parent.setDialogTrigger) {
        parent.setDialogTrigger();
    }
}

function setDialogTrigger() {
    require("common/common").setDialogTrigger();
}

function callIframeParentFunction_deleteShopProductList(type, shopProductNo) {
    if (parent.deleteShopProductList) {
        parent.deleteShopProductList(type, shopProductNo);
    }
}

function deleteShopProductList(type, shopProductNo) {
    require("site/data").shop.handleShopProduct.deleteShopProductList(type, shopProductNo);
}

function callIframeParentFunction_deleteModelFromCollection(dataType, obj, callback) {
    if (parent.deleteModelFromCollection) {
        parent.deleteModelFromCollection(dataType, obj, callback);
    }
}

function deleteModelFromCollection(dataType, obj, callback) {
    require("data/data").deleteModelFromCollection(dataType, obj, function () {
        if (callback) {
            callback();
        }
    });
}

function callIframeParentFunction_getPostList(type) {
    if (parent.getPostList) {
        return parent.getPostList(type);
    }
}

function getPostList(type) {
    return require("board/board").handle.handleBoardPost.getBoardPostList(type);
}

function callIframeParentFunction_deletePostList(type, obj) {
    if (parent.deletePostList) {
        parent.deletePostList(type, obj);
    }
}

function deletePostList(type, obj) {
    require("board/board").handle.handleBoardPost.deleteBoardPost(type, obj);
}

function callIframeParentFunction_addPostList(type, obj) {
    if (parent.addPost) {
        return parent.addPost(type, obj);
    }
}

function addPost(type, obj) {
    return require("board/board").handle.handleBoardPost.addBoardPost(type, obj);
}

function callIframeParentFunction_changeShopOrderStatus(beforeStatus, orderStatus, shopOrder, callback) {
    if (parent.changeShopOrderStatus) {
        return parent.changeShopOrderStatus(beforeStatus, orderStatus, shopOrder, callback);
    }
}

function changeShopOrderStatus(beforeStatus, orderStatus, shopOrder, callback) {
    require("shop/shop").order().common.handleShopOrder.changeShopOrderStatus(beforeStatus, orderStatus, shopOrder, function () {
        if (callback) {
            callback(newModel);
        }
    });
}

function callIframeParentFunction_handleAddShopOrder(orderStatus, shopOrder) {
    if (parent.handleAddShopOrder) {
        return parent.handleAddShopOrder(orderStatus, shopOrder);
    }
}

function handleAddShopOrder(orderStatus, shopOrder) {
    require("shop/shop").order().common.handleShopOrder.addShopOrder(orderStatus, shopOrder);

}

function callIframeParentFunction_handleGetShopOrderList(orderStatus) {
    if (parent.handleGetShopOrderList) {
        return parent.handleGetShopOrderList(orderStatus);
    }
}

function handleGetShopOrderList(orderStatus) {
    return require("shop/shop").order().common.handleShopOrder.getShopOrderList(orderStatus);
}

function callIframeParentFunction_reloadUserHomePage(type) {
    if (parent.reloadUserHomePage) {
        return parent.reloadUserHomePage(type);
    }
}

function reloadUserHomePage(type, params) {
    require("userHome/get").reloadUserHomePage(type, params);
}

function callIframeFunction_closeShopOrderDetail() {
    if (self == top) {
        history.back();
    } else {
        parent.closeShopOrderDetail();
    }
}

function callIframeFunction_closeShopCustomerDetail() {
    if (self == top) {
        history.back();
    } else {
        parent.closeShopCustomerDetail();
    }
}

