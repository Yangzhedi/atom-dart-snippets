'use babel';

import AtomDartSnippetsView from './atom-dart-snippets-view';
import { CompositeDisposable } from 'atom';

export default {

  atomDartSnippetsView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomDartSnippetsView = new AtomDartSnippetsView(state.atomDartSnippetsViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomDartSnippetsView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-dart-snippets:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomDartSnippetsView.destroy();
  },

  serialize() {
    return {
      atomDartSnippetsViewState: this.atomDartSnippetsView.serialize()
    };
  },

  toggle() {
    console.log('AtomDartSnippets was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
