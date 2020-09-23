import { RootStore } from "./rootStore";
import { observable, action } from "mobx";

export default class ModalStore {
    rootStore: RootStore;
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @observable.shallow modal = {
        open: false,
        body: null
    }
    
    @observable.shallow searchModal = {
        openSearchModal: false,
        bodySearchModal: null
    }
    
    @action openModal = (content: any) => {
        this.modal.open = true;
        this.modal.body = content;
    }
    @action openSearchModal = (content: any) => {
        this.searchModal.openSearchModal = true;
        this.searchModal.bodySearchModal = content;
    }

    @action closeModal = () => {
        this.modal.open = false;
        this.modal.body = null;
    }
    @action closeSearchModal = () => {
        this.searchModal.openSearchModal = false;
        this.searchModal.bodySearchModal = null;
    }
}