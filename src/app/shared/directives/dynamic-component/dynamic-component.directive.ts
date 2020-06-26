import { Component, Directive, Input, Compiler, NgModule, ViewEncapsulation, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Directive({
    selector: 'html-outlet'
})
export class HtmlOutletDirective {

    @Input() html: string;
    // @Input() styleArticle: string;

    constructor(
        private _viewContainerRef: ViewContainerRef,
        private _compiler: Compiler) { }

    ngOnChanges() {
        const template = this.html;
        // const style = this.styleArticle;

        @Component({
            selector: 'dynamic-article',
            template: template,
            // styles: [style],
            encapsulation: ViewEncapsulation.None,
        })
        class DynamicArticleComponent {
            name = 'dsd';
            condition = true
        };

        @NgModule({
            imports: [
                CommonModule,
            ],
            declarations: [DynamicArticleComponent]
        })
        class DynamicArticleModule { };
        this._compiler.compileModuleAndAllComponentsAsync(DynamicArticleModule)
            .then(factory => {
                const compFactory = factory.componentFactories.find(comp =>
                    comp.componentType === DynamicArticleComponent);
                const teste = this._viewContainerRef.createComponent(compFactory, 0);
                // teste.instance.name = "fdfdfd"
            });
    }
}