
define(['knockout','uikit','js/router','js/base'], function(ko,UIkit, router,base) {
    console.log(base);
    // Components can be packaged as AMD modules, such as the following:
    ko.components.register('nav-bar', { require: 'view/nav-bar/nav-bar' });
    ko.components.register('home-page', { require: 'view/home-page/home' });
    ko.components.register('login', { require: 'js/modules/login/index' });
    // ... or for template-only components, you can just point to a .html file directly:
    ko.components.register('about-page', {
      template: { require: 'text!view/about-page/about.html' }
    });

    // [Scaffolded component registrations will be inserted here. To retain this feature, don't remove this comment.]

    // Start the application


    var viewModel=function(){
        this.firstLoading=ko.observable(true);
    }

    var mainModel=new viewModel();
    ko.applyBindings(mainModel,$('#main-global')[0]);
    
    
    
    bindKnockout($('#content')[0]);

    


    
    
    $(document)
        .on('pjax:clicked', function(event, request) {
            console.log('pjax: click');
        })
        .on('pjax:send', function() {
            console.log('pjax:send');
            mainModel.firstLoading(true);
              
        })
        .on('submit', 'form[data-pjax]', function(event) {
            $.pjax.submit(event, 'body')
        })
        .on('pjax:timeout', function(event) {
            event.preventDefault()
        })
        .on('pjax:complete', function(event, request) {
            var content=$(event.target);
            bindKnockout(content[0]);
        });



    function bindKnockout(target){
        mainModel.firstLoading(false);
        ko.cleanNode(target);
        ko.applyBindings({ route: router.currentRoute },target);
    };

});
