// Generated by typings
// Source: https://raw.githubusercontent.com/aurelia/templating-resources/master/dist/aurelia-templating-resources.d.ts
declare module 'aurelia-templating-resources' {
import {
  inject,
  Container,
  Optional
} from 'aurelia-dependency-injection';
import {
  BoundViewFactory,
  ViewSlot,
  customAttribute,
  templateController,
  useView,
  customElement,
  bindable,
  ViewResources,
  resource,
  ViewCompileInstruction,
  CompositionEngine,
  noView,
  View,
  ViewEngine,
  Animator,
  TargetInstruction
} from 'aurelia-templating';
import {
  createOverrideContext,
  bindingMode,
  EventManager,
  BindingBehavior,
  ValueConverter,
  sourceContext,
  DataAttributeObserver,
  mergeSplice,
  valueConverter,
  ObserverLocator
} from 'aurelia-binding';
import {
  TaskQueue
} from 'aurelia-task-queue';
import {
  DOM,
  FEATURE
} from 'aurelia-pal';
import {
  Loader
} from 'aurelia-loader';
import {
  relativeToFile
} from 'aurelia-path';
import {
  mixin
} from 'aurelia-metadata';

/**
* A strategy is for repeating a template over an iterable or iterable-like object.
*/
export interface RepeatStrategy {
  instanceChanged(repeat: Repeat, items: any): void;
  instanceMutated(repeat: Repeat, items: any, changes: any): void;
  getCollectionObserver(observerLocator: any, items: any): any;
}

/**
* Creates a binding context for decandant elements to bind to.
*/
export class With {
  
  /**
    * Creates an instance of With.
    * @param viewFactory The factory generating the view.
    * @param viewSlot The slot the view is injected in to.
    */
  constructor(viewFactory?: any, viewSlot?: any);
  
  /**
    * Binds the With with provided binding context and override context.
    * @param bindingContext The binding context.
    * @param overrideContext An override context for binding.
    */
  bind(bindingContext?: any, overrideContext?: any): any;
  
  /**
    * Invoked everytime the bound value changes.
    * @param newValue The new value.
    */
  valueChanged(newValue?: any): any;
  
  /**
    * Unbinds With
    */
  unbind(): any;
}
export class UpdateTriggerBindingBehavior {
  static inject: any;
  constructor(eventManager?: any);
  bind(binding?: any, source?: any, ...events: any[]): any;
  unbind(binding?: any, source?: any): any;
}
export class ThrottleBindingBehavior {
  bind(binding?: any, source?: any, delay?: any): any;
  unbind(binding?: any, source?: any): any;
}
export class SelfBindingBehavior {
  bind(binding?: any, source?: any): any;
  unbind(binding?: any, source?: any): any;
}

/**
* Marks any part of a view to be replacable by the consumer.
*/
export class Replaceable {
  
  /**
    * @param viewFactory target The factory generating the view.
    * @param viewSlot viewSlot The slot the view is injected in to.
    */
  constructor(viewFactory?: any, viewSlot?: any);
  
  /**
    * Binds the replaceable to the binding context and override context.
    * @param bindingContext The binding context.
    * @param overrideContext An override context for binding.
    */
  bind(bindingContext?: any, overrideContext?: any): any;
  
  /**
    * Unbinds the replaceable.
    */
  unbind(): any;
}

/**
* Update the override context.
* @param startIndex index in collection where to start updating.
*/
export function updateOverrideContexts(views?: any, startIndex?: any): any;

/**
  * Creates a complete override context.
  * @param data The item's value.
  * @param index The item's index.
  * @param length The collections total length.
  * @param key The key in a key/value pair.
  */
export function createFullOverrideContext(repeat?: any, data?: any, index?: any, length?: any, key?: any): any;

/**
* Updates the override context.
* @param context The context to be updated.
* @param index The context's index.
* @param length The collection's length.
*/
export function updateOverrideContext(overrideContext?: any, index?: any, length?: any): any;

/**
* Gets a repeat instruction's source expression.
*/
export function getItemsSourceExpression(instruction?: any, attrName?: any): any;

/**
* Unwraps an expression to expose the inner, pre-converted / behavior-free expression.
*/
export function unwrapExpression(expression?: any): any;

/**
* Returns whether an expression has the OneTimeBindingBehavior applied.
*/
export function isOneTime(expression?: any): any;

/**
* Forces a binding instance to reevaluate.
*/
export function updateOneTimeBinding(binding?: any): any;

/**
 * Returns the index of the element in an array, optionally using a matcher function.
 */
export function indexOf(array?: any, item?: any, matcher?: any, startIndex?: any): any;

/**
* A strategy for repeating a template over null or undefined (does nothing)
*/
export class NullRepeatStrategy {
  instanceChanged(repeat?: any, items?: any): any;
  getCollectionObserver(observerLocator?: any, items?: any): any;
}

/**
* Binding to conditionally include or not include template logic depending on returned result
* - value should be Boolean or will be treated as such (truthy / falsey)
*/
export class If {
  
  /**
    * Creates an instance of If.
    * @param {BoundViewFactory} viewFactory The factory generating the view
    * @param {ViewSlot} viewSlot The slot the view is injected in to
    */
  constructor(viewFactory?: any, viewSlot?: any);
  
  /**
    * Binds the if to the binding context and override context
    * @param bindingContext The binding context
    * @param overrideContext An override context for binding.
    */
  bind(bindingContext?: any, overrideContext?: any): any;
  
  /**
    * Invoked everytime value property changes.
    * @param newValue The new value
    */
  valueChanged(newValue?: any): any;
  
  /**
    * Unbinds the if
    */
  unbind(): any;
}

/**
* Default Html Sanitizer to prevent script injection.
*/
export class HTMLSanitizer {
  
  /**
    * Sanitizes the provided input.
    * @param input The input to be sanitized.
    */
  sanitize(input?: any): any;
}

/**
* CustomAttribute that binds provided DOM element's focus attribute with a property on the viewmodel.
*/
export class Focus {
  
  /**
    * Creates an instance of Focus.
    * @paramelement Target element on where attribute is placed on.
    * @param taskQueue The TaskQueue instance.
    */
  constructor(element?: any, taskQueue?: any);
  
  /**
    * Invoked everytime the bound value changes.
    * @param newValue The new value.
    */
  valueChanged(newValue?: any): any;
  
  /**
    * Invoked when the attribute is attached to the DOM.
    */
  attached(): any;
  
  /**
    * Invoked when the attribute is detached from the DOM.
    */
  detached(): any;
}
export class DebounceBindingBehavior {
  bind(binding?: any, source?: any, delay?: any): any;
  unbind(binding?: any, source?: any): any;
}

/**
* Used to compose a new view / view-model template or bind to an existing instance.
*/
export class Compose {
  model: any;
  view: any;
  viewModel: any;
  swapOrder: any;
  
  /**
    * Creates an instance of Compose.
    * @param element The Compose element.
    * @param container The dependency injection container instance.
    * @param compositionEngine CompositionEngine instance to compose the element.
    * @param viewSlot The slot the view is injected in to.
    * @param viewResources Collection of resources used to compile the the view.
    * @param taskQueue The TaskQueue instance.
    */
  constructor(element?: any, container?: any, compositionEngine?: any, viewSlot?: any, viewResources?: any, taskQueue?: any);
  
  /**
    * Invoked when the component has been created.
    *
    * @param owningView The view that this component was created inside of.
    */
  created(owningView: View): any;
  
  /**
    * Used to set the bindingContext.
    *
    * @param bindingContext The context in which the view model is executed in.
    * @param overrideContext The context in which the view model is executed in.
    */
  bind(bindingContext?: any, overrideContext?: any): any;
  
  /**
    * Unbinds the Compose.
    */
  unbind(bindingContext?: any, overrideContext?: any): any;
  
  /**
    * Invoked everytime the bound model changes.
    * @param newValue The new value.
    * @param oldValue The old value.
    */
  modelChanged(newValue?: any, oldValue?: any): any;
  
  /**
    * Invoked everytime the bound view changes.
    * @param newValue The new value.
    * @param oldValue The old value.
    */
  viewChanged(newValue?: any, oldValue?: any): any;
  
  /**
      * Invoked everytime the bound view model changes.
      * @param newValue The new value.
      * @param oldValue The old value.
      */
  viewModelChanged(newValue?: any, oldValue?: any): any;
}
export class BindingSignaler {
  signals: any;
  signal(name: string): void;
}
export class OneTimeBindingBehavior {
  constructor();
}
export class OneWayBindingBehavior {
  constructor();
}
export class TwoWayBindingBehavior {
  constructor();
}
export const aureliaHideClassName: any;
export function injectAureliaHideStyleAtHead(): any;
export function injectAureliaHideStyleAtBoundary(domBoundary?: any): any;
export class AttrBindingBehavior {
  bind(binding?: any, source?: any): any;
  unbind(binding?: any, source?: any): any;
}

/**
* Behaviors that do not require the composition lifecycle callbacks when replacing
* their binding context.
*/
export const lifecycleOptionalBehaviors: any;
export function viewsRequireLifecycle(viewFactory?: any): any;

/**
* An abstract base class for elements and attributes that repeat
* views.
*/
export class AbstractRepeater {
  constructor(options?: any);
  
  /**
     * Returns the number of views the repeater knows about.
     *
     * @return {Number}  the number of views.
     */
  viewCount(): any;
  
  /**
     * Returns all of the repeaters views as an array.
     *
     * @return {Array} The repeater's array of views;
     */
  views(): any;
  
  /**
     * Returns a single view from the repeater at the provided index.
     *
     * @param {Number} index The index of the requested view.
     * @return {View|ViewSlot} The requested view.
     */
  view(index?: any): any;
  
  /**
     * Returns the matcher function to be used by the repeater, or null if strict matching is to be performed.
     *
     * @return {Function|null} The requested matcher function.
     */
  matcher(): any;
  
  /**
     * Adds a view to the repeater, binding the view to the
     * provided contexts.
     *
     * @param {Object} bindingContext The binding context to bind the new view to.
     * @param {Object} overrideContext A secondary binding context that can override the primary context.
     */
  addView(bindingContext?: any, overrideContext?: any): any;
  
  /**
     * Inserts a view to the repeater at a specific index, binding the view to the
     * provided contexts.
     *
     * @param {Number} index The index at which to create the new view at.
     * @param {Object} bindingContext The binding context to bind the new view to.
     * @param {Object} overrideContext A secondary binding context that can override the primary context.
     */
  insertView(index?: any, bindingContext?: any, overrideContext?: any): any;
  
  /**
     * Moves a view across the repeater.
     *
     * @param {Number} sourceIndex The index of the view to be moved.
     * @param {Number} sourceIndex The index where the view should be placed at.
     */
  moveView(sourceIndex?: any, targetIndex?: any): any;
  
  /**
     * Removes all views from the repeater.
     * @param {Boolean} returnToCache Should the view be returned to the view cache?
     * @param {Boolean} skipAnimation Should the removal animation be skipped?
     * @return {Promise|null}
     */
  removeAllViews(returnToCache?: boolean, skipAnimation?: boolean): any;
  
  /**
     * Removes an array of Views from the repeater.
     *
     * @param {Array} viewsToRemove The array of views to be removed.
     * @param {Boolean} returnToCache Should the view be returned to the view cache?
     * @param {Boolean} skipAnimation Should the removal animation be skipped?
     * @return {Promise|null}
     */
  removeViews(viewsToRemove: Array<View>, returnToCache?: boolean, skipAnimation?: boolean): any;
  
  /**
     * Removes a view from the repeater at a specific index.
     *
     * @param {Number} index The index of the view to be removed.
     * @param {Boolean} returnToCache Should the view be returned to the view cache?
     * @param {Boolean} skipAnimation Should the removal animation be skipped?
     * @return {Promise|null}
     */
  removeView(index: number, returnToCache?: boolean, skipAnimation?: boolean): any;
  
  /**
     * Forces a particular view to update it's bindings, called as part of
     * an in-place processing of items for better performance
     *
     * @param {Object} view the target view for bindings updates
     */
  updateBindings(view: View): any;
}

/**
* A strategy for repeating a template over an array.
*/
export class ArrayRepeatStrategy {
  
  /**
    * Gets an observer for the specified collection.
    * @param observerLocator The observer locator instance.
    * @param items The items to be observed.
    */
  getCollectionObserver(observerLocator?: any, items?: any): any;
  
  /**
    * Handle the repeat's collection instance changing.
    * @param repeat The repeater instance.
    * @param items The new array instance.
    */
  instanceChanged(repeat?: any, items?: any): any;
  
  /**
    * Handle the repeat's collection instance mutating.
    * @param repeat The repeat instance.
    * @param array The modified array.
    * @param splices Records of array changes.
    */
  instanceMutated(repeat?: any, array?: any, splices?: any): any;
}

/**
* A strategy for repeating a template over a Map.
*/
export class MapRepeatStrategy {
  
  /**
    * Gets a Map observer.
    * @param items The items to be observed.
    */
  getCollectionObserver(observerLocator?: any, items?: any): any;
  
  /**
    * Process the provided Map entries.
    * @param items The entries to process.
    */
  instanceChanged(repeat?: any, items?: any): any;
  
  /**
    * Handle changes in a Map collection.
    * @param map The underlying Map collection.
    * @param records The change records.
    */
  instanceMutated(repeat?: any, map?: any, records?: any): any;
}

/**
* A strategy for repeating a template over a number.
*/
export class NumberRepeatStrategy {
  
  /**
    * Return the strategies collection observer. In this case none.
    */
  getCollectionObserver(): any;
  
  /**
    * Process the provided Number.
    * @param value The Number of how many time to iterate.
    */
  instanceChanged(repeat?: any, value?: any): any;
}

/**
* A strategy for repeating a template over a Set.
*/
export class SetRepeatStrategy {
  
  /**
    * Gets a Set observer.
    * @param items The items to be observed.
    */
  getCollectionObserver(observerLocator?: any, items?: any): any;
  
  /**
    * Process the provided Set entries.
    * @param items The entries to process.
    */
  instanceChanged(repeat?: any, items?: any): any;
  
  /**
    * Handle changes in a Set collection.
    * @param map The underlying Set collection.
    * @param records The change records.
    */
  instanceMutated(repeat?: any, set?: any, records?: any): any;
}

/**
* Simple html sanitization converter to preserve whitelisted elements and attributes on a bound property containing html.
*/
export class SanitizeHTMLValueConverter {
  
  /**
     * Creates an instanse of the value converter.
     * @param sanitizer The html sanitizer.
     */
  constructor(sanitizer?: any);
  
  /**
    * Process the provided markup that flows to the view.
    * @param untrustedMarkup The untrusted markup to be sanitized.
    */
  toView(untrustedMarkup?: any): any;
}
export function getElementName(address?: any): any;
export function configure(config?: any): any;
export class SignalBindingBehavior {
  static inject(): any;
  signals: any;
  constructor(bindingSignaler?: any);
  bind(binding?: any, source?: any): any;
  unbind(binding?: any, source?: any): any;
}

/**
* Binding to conditionally show markup in the DOM based on the value.
* - different from "if" in that the markup is still added to the DOM, simply not shown.
*/
export class Hide {
  
  /**
    * Creates a new instance of Hide.
    * @param element Target element to conditionally hide.
    * @param animator The animator that conditionally adds or removes the aurelia-hide css class.
    * @param domBoundary The DOM boundary. Used when the behavior appears within a component that utilizes the shadow DOM.
    */
  constructor(element?: any, animator?: any, domBoundary?: any);
  
  /**
    * Invoked when the behavior is created.
    */
  created(): any;
  
  /**
    * Invoked everytime the bound value changes.
    * @param newValue The new value.
    */
  valueChanged(newValue?: any): any;
  
  /**
    * Binds the Hide attribute.
    */
  bind(bindingContext?: any): any;
}

/**
* Binding to conditionally show markup in the DOM based on the value.
* - different from "if" in that the markup is still added to the DOM, simply not shown.
*/
export class Show {
  
  /**
    * Creates a new instance of Show.
    * @param element Target element to conditionally show.
    * @param animator The animator that conditionally adds or removes the aurelia-hide css class.
    * @param domBoundary The DOM boundary. Used when the behavior appears within a component that utilizes the shadow DOM.
    */
  constructor(element?: any, animator?: any, domBoundary?: any);
  
  /**
    * Invoked when the behavior is created.
    */
  created(): any;
  
  /**
    * Invoked everytime the bound value changes.
    * @param newValue The new value.
    */
  valueChanged(newValue?: any): any;
  
  /**
    * Binds the Show attribute.
    */
  bind(bindingContext?: any): any;
}

/**
* Locates the best strategy to best repeating a template over different types of collections.
* Custom strategies can be plugged in as well.
*/
/**
* Locates the best strategy to best repeating a template over different types of collections.
* Custom strategies can be plugged in as well.
*/
export class RepeatStrategyLocator {
  
  /**
    * Creates a new RepeatStrategyLocator.
    */
  constructor();
  
  /**
    * Adds a repeat strategy to be located when repeating a template over different collection types.
    * @param strategy A repeat strategy that can iterate a specific collection type.
    */
  addStrategy(matcher: ((items: any) => boolean), strategy: RepeatStrategy): any;
  
  /**
    * Gets the best strategy to handle iteration.
    */
  getStrategy(items: any): RepeatStrategy;
}

/*eslint no-loop-func:0, no-unused-vars:0*/
/**
* Binding to iterate over iterable objects (Array, Map and Number) to genereate a template for each iteration.
*/
export class Repeat extends AbstractRepeater {
  items: any;
  local: any;
  key: any;
  value: any;
  
  /**
   * Creates an instance of Repeat.
   * @param viewFactory The factory generating the view
   * @param instruction The instructions for how the element should be enhanced.
   * @param viewResources Collection of resources used to compile the the views.
   * @param viewSlot The slot the view is injected in to.
   * @param observerLocator The observer locator instance.
   * @param collectionStrategyLocator The strategy locator to locate best strategy to iterate the collection.
   */
  constructor(viewFactory?: any, instruction?: any, viewSlot?: any, viewResources?: any, observerLocator?: any, strategyLocator?: any);
  call(context?: any, changes?: any): any;
  
  /**
    * Binds the repeat to the binding context and override context.
    * @param bindingContext The binding context.
    * @param overrideContext An override context for binding.
    */
  bind(bindingContext?: any, overrideContext?: any): any;
  
  /**
    * Unbinds the repeat
    */
  unbind(): any;
  
  /**
    * Invoked everytime the item property changes.
    */
  itemsChanged(): any;
  
  /**
    * Invoked when the underlying collection changes.
    */
  handleCollectionMutated(collection?: any, changes?: any): any;
  
  /**
    * Invoked when the underlying inner collection changes.
    */
  handleInnerCollectionMutated(collection?: any, changes?: any): any;
  
  // @override AbstractRepeater
  viewCount(): any;
  views(): any;
  view(index?: any): any;
  matcher(): any;
  addView(bindingContext?: any, overrideContext?: any): any;
  insertView(index?: any, bindingContext?: any, overrideContext?: any): any;
  moveView(sourceIndex?: any, targetIndex?: any): any;
  removeAllViews(returnToCache?: any, skipAnimation?: any): any;
  removeViews(viewsToRemove?: any, returnToCache?: any, skipAnimation?: any): any;
  removeView(index?: any, returnToCache?: any, skipAnimation?: any): any;
  updateBindings(view: View): any;
}
}