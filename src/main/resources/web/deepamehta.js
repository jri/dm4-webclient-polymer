DM4 = {

    Type: function(type) {
        if (type) {
            this.id      = type.id;
            this.uri     = type.uri;
            this.value   = type.value;
            this.typeUri = type.type_uri;
            this.childs  = type.childs;
            //
            this.dataTypeUri      = type.data_type_uri;
            this.indexModeUris    = type.index_mode_uris;
            this.assocDefs        = type.assoc_defs;
            this.labelConfig      = type.label_config;
            this.viewConfigTopics = type.view_config_topics;
        }
    },

    TopicType: function(topicType) {
        DM4.Type.call(this, topicType);
    },

    AssociationType: function(assocType) {
        DM4.Type.call(this, assocType);
    }
}

DM4.Type.prototype = {

    isSimple: function() {
        return !this.isComposite();
    },

    isComposite: function() {
        return this.dataTypeUri == "dm4.core.composite";
    }
}

DM4.TopicType.prototype = new DM4.Type();

DM4.AssociationType.prototype = new DM4.Type();
