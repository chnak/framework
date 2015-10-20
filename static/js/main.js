define(['jquery','knockout','uikit','js/base','notify','tooltip.min'], function($, ko, UIkit, base) {
    window.jQuery=window.$=$;
    window.ko=ko;
    // Components can be packaged as AMD modules, such as the following:
    ko.components.register('widget-nav', { require: 'view/widget/nav-bar' });
    ko.components.register('widget-login', { require: 'view/widget/login-box' });
    ko.components.register('widget-signup', { require: 'view/widget/signup-box' });
    // ... or for template-only components, you can just point to a .html file directly:
    ko.components.register('about-page', {
      template: { require: 'text!view/about-page/about.html' }
    });

    // [Scaffolded component registrations will be inserted here. To retain this feature, don't remove this comment.]

    // Start the application

    var body=$(document.body);
    var main_global=body.children('#main-global');
    var content=body.children('#content');

    var viewModel=function(){
        this.firstLoading=ko.observable(true);
    }

    var mainModel=new viewModel();
    ko.applyBindings(mainModel,main_global[0]);

    var contentModel={
    };

    bindKnockout.call(content[0],contentModel);

    window.setTimeout(function(){
        content.fadeIn('fast');
    },150);

    $.ajaxSetup({
        type: "POST",
        dataType: 'json',
        timeout:120000
    });

    $(document).ajaxError(function( event,xhr, settings, err ) {
        console.log(xhr)
        //if(xhr.readyState==4)return
        if(xhr.status==500){
            console.log(xhr.responseJSON)
            return UIkit.notify(xhr.responseJSON.message||'Failed connect to server.',{status  : 'warning'});
        }
    });



    $(document)
        .on('pjax:clicked', function(event, request) {
            console.log('pjax: click');
        })
        .on('pjax:send', function() {
            console.log('pjax:send');
            mainModel.firstLoading(true);
            $.UIkit.offcanvas.hide();
        })
        .on('submit', 'form[data-pjax]', function(event) {
            $.pjax.submit(event, 'body')
        })
        .on('pjax:timeout', function(event) {
            event.preventDefault()
        })
        .on('pjax:complete', function(event, request) {
            var content=$(document).find(event.target);
            //bindKnockout(content[0]);
            //$(document.body).children(':not(div)').remove();
        })
        .on('pjax:beforeReplace',function(event,contents, opt){
            var html=$('<div></div>').html(contents);
            console.log('pjax:beforeReplace')
            bindKnockout.call(html[0],contentModel);
            html.remove();
        })
        .on('pjax:success',function(event,data, status, xhr, options){
            console.log('pjax:success')
            bindKnockout.call(content[0],contentModel);
        })
        .on('pjax:error',function(xhr, textStatus, errorThrown){
            $('#content').html('None fond!');
        });



    function bindKnockout(model){
        ko.cleanNode(this);
        ko.applyBindings(model||{},this);
        window.setTimeout(function(){
            mainModel.firstLoading(false);
        },400);
    };

});
