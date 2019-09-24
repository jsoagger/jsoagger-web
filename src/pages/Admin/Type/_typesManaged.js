export default {
    items: [
        {
            displayName: 'Element',
            businessClass: 'io.github.jsoagger.core.model.part.Element',
            rootType: 'io.github.jsoagger.Element'
        },
        {
            displayName: 'Document',
            businessClass: 'io.github.jsoagger.core.model.document.Document',
            rootType: 'io.github.jsoagger.doc.Document'
        },
        {
            displayName: 'Identification',
            businessClass: 'io.github.jsoagger.core.model.api.multiIdentifiable.Identification',
            rootType: 'io.github.jsoagger.id.Identification'
        },
        {
            displayName: 'Container',
            businessClass: 'io.github.jsoagger.core.model.api.composite.Container',
            rootType: 'io.github.jsoagger.Container'
        },
        {
            displayName: 'Product instance',
            businessClass: 'io.github.jsoagger.core.model.shop.ProductInstance',
            rootType: 'io.github.jsoagger.product.ProductInstance'
        },
        {
            displayName: 'Category',
            businessClass: 'io.github.jsoagger.core.model.api.classifiable.ObjectCategory',
            rootType: 'io.github.jsoagger.classification.Category'
        },
        {
            displayName: 'Contact mechanism',
            businessClass: 'io.github.jsoagger.core.model.api.contact.ContactMechanism',
            rootType: 'io.github.jsoagger.contact.ContactMechanism'
        },
        {
            displayName: 'Product catalog',
            businessClass: 'io.github.jsoagger.core.model.shop.ProductCatalog',
            rootType: 'io.github.jsoagger.Catalog'
        },
        {
            displayName: 'Party',
            businessClass: 'io.github.jsoagger.core.model.people.Party',
            rootType: 'io.github.jsoagger.people.Party'
        },
        {
            displayName: 'Organization',
            businessClass: 'io.github.jsoagger.core.model.people.organisation.Organization',
            rootType: 'io.github.jsoagger.people.Party/Organisation'
        },
        {
            displayName: 'Person',
            businessClass: 'io.github.jsoagger.core.model.people.person.Person',
            rootType: 'io.github.jsoagger.people.Party/Person'
        },
        {
            displayName: 'Element to Element master (Link)',
            businessClass: 'io.github.jsoagger.core.model.part.ElementToElementMasterLink',
            rootType: 'io.github.jsoagger.objectLink.ElementToElementMasterLink'
        },
        {
            displayName: 'Element to Element (Link)',
            businessClass: 'io.github.jsoagger.core.model.part.ElementToElementLink',
            rootType: 'io.github.jsoagger.objectLink.ElementToElementLink'
        },
        {
            displayName: 'Element to Document master (Link)',
            businessClass: 'io.github.jsoagger.core.model.part.ElementToDocumentMasterLink',
            rootType: 'io.github.jsoagger.objectLink.ElementToDocumentMasterLink'
        },
        {
            displayName: 'Element to Document (Link)',
            businessClass: 'io.github.jsoagger.core.model.part.ElementToDocumentLink',
            rootType: 'io.github.jsoagger.objectLink.ElementToDocumentLink'
        },
        {
            displayName: 'Document to Document master (Link)',
            businessClass: 'io.github.jsoagger.core.model.document.DocumentDocMasterLink',
            rootType: 'io.github.jsoagger.objectLink.DocumentToDocumentMasterLink'
        },
        {
            displayName: 'Document to Document (Link)',
            businessClass: 'io.github.jsoagger.core.model.document.DocumentDocumentLink',
            rootType: 'io.github.jsoagger.objectLink.DocumentToDocumentLink'
        },
    ],
}