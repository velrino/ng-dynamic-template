import { Component, Directive, Input, Compiler, NgModule, ViewEncapsulation, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Directive({
    selector: 'html-outlet'
})
export class DynamicTemplateDirective {

    @Input() template: string;
    @Input() script: any;
    @Input() style: string;

    constructor(
        private _viewContainerRef: ViewContainerRef,
        private _compiler: Compiler) { }

    ngOnChanges() {
        const { template, style, script } = this;

        @Component({
            selector: 'dynamic-html',
            template,
            styles: [style],
            encapsulation: ViewEncapsulation.None,
        })
        class DynamicTemplateComponent { };

        @NgModule({
            imports: [CommonModule],
            declarations: [DynamicTemplateComponent]
        })
        class DynamicTemplateModule { };
        this._compiler.compileModuleAndAllComponentsAsync(DynamicTemplateModule)
            .then(factory => {
                const compFactory = factory.componentFactories.find(comp =>
                    comp.componentType === DynamicTemplateComponent);
                const componentInstance = this._viewContainerRef.createComponent(compFactory, 0);
                if (script) {
                    const scriptsArray = Object.keys(this.script);
                    for (let index = 0; index < scriptsArray.length; index++) {
                        const scriptItem = scriptsArray[index];
                        componentInstance.instance[scriptItem] = script[scriptItem]
                    }
                }
            });
    }
}