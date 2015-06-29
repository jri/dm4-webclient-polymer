DM4 = {

    Object: function(object) {
        if (object) {
            this.id      = object.id;
            this.uri     = object.uri;
            this.typeUri = object.type_uri;
            this.value   = object.value;
            this.childs  = DM4.buildChildTopics(object.childs);
        }
    },

    Topic: function(topic) {
        DM4.Object.call(this, topic);
    },

    Association: function(assoc) {
        DM4.Object.call(this, assoc);
        this.role1 = assoc.role_1;
        this.role2 = assoc.role_2;
    },

    Type: function(type) {
        DM4.Topic.call(this, type);
        if (type) {
            this.dataTypeUri      = type.data_type_uri;
            this.indexModeUris    = type.index_mode_uris;
            this.assocDefs        = DM4._initAssocDefs(type.assoc_defs);
            this.labelConfig      = type.label_config;
            this.viewConfigTopics = DM4.hashByType(type.view_config_topics);
        }
    },

    TopicType: function(topicType) {
        DM4.Type.call(this, topicType);
    },

    AssociationType: function(assocType) {
        DM4.Type.call(this, assocType);
    },

    // === DM Utilities ===

    buildChildTopics: function(childs) {
        // console.log("DM4.buildChildTopics", childs);
        var childTopics = {}
        for (var childTypeUri in childs) {
            var childTopic = childs[childTypeUri]
            if (js.is_array(childTopic)) {
                childTopics[childTypeUri] = []
                for (var i = 0, topic; topic = childTopic[i]; i++) {
                    childTopics[childTypeUri].push(new Topic(topic))
                }
            } else {
                childTopics[childTypeUri] = new Topic(childTopic)
            }
        }
        return childTopics
    },

    hashByType: function(topics) {
        var hashedTopics = {}
        for (var i = 0, topic; topic = topics[i]; i++) {
            hashedTopics[topic.type_uri] = topic
        }
        return hashedTopics
    },

    _initAssocDefs: function(assocDefs) {
        for (var i = 0, assocDef; assocDef = assocDefs[i]; i++) {
            // add convenience properties
            var assoc = new DM4.Association(assocDef);
            assocDef.parentTypeUri = assoc.getRole("dm4.core.parent_type").topic_uri;
            assocDef.childTypeUri  = assoc.getRole("dm4.core.child_type").topic_uri;
        }
        return assocDefs;
    },

    // === Javascript Utilities ===

    /* size: function(object) {
        var size = 0
        for (var key in object) {
            size++
        }
        return size
    },

    isEmpty: function(object) {
        return this.size(object) == 0;
    } */
}

DM4.Association.prototype = {

    getRole: function(roleTypeUri) {
        var match1 = this.role1.role_type_uri == roleTypeUri;
        var match2 = this.role2.role_type_uri == roleTypeUri;
        if (match1 && match2) {
            throw "AssociationError: ambiguity in association " + this.id +
                " when looking for the \"" + roleTypeUri + "\" role";
        }
        return match1 ? this.role1 : match2 ? this.role2 : undefined;
    }
}

DM4.Type.prototype = {

    isSimple: function() {
        return !this.isComposite();
    },

    isComposite: function() {
        return this.dataTypeUri == "dm4.core.composite";
    },

    getViewConfig: function(viewConfigTypeUri, childTypeUri) {
        var viewConfigTopic = this.viewConfigTopics[viewConfigTypeUri];
        var childTopic = viewConfigTopic && viewConfigTopic.childs[childTypeUri];
        return childTopic && childTopic.value;
    }
}

DM4.TopicType.prototype = new DM4.Type();

DM4.AssociationType.prototype = new DM4.Type();
