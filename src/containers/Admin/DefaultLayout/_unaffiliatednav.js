export default {
  items: [
    {
      name: 'Version',
      url: '/appVersionHistory',
      icon: 'icon-info'
    },
    {
      title: true,
      name: 'Container',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Business rules',
      url: '/admin/p/businessRules',
      icon: 'fa fa-puzzle-piece'
    },
    {
        name: 'Users',
        url: '/admin/p/containerMembers',
        icon: 'fa fa-users',
        children: [
            {
                name: 'Manage',
                url: '/admin/p/manageUsers',
                icon: 'fa fa-users'
            },
            {
                name: 'Create',
                url: '/admin/p/containerMembers/register/cu',
                icon: 'fa fa-plus'
            },
          ],
      },
    {
	    title: true,
	    name: 'Batch',
	  },
	  {
	    name: 'Load data',
	    url: '/admin/p/batchLoad',
	    icon: 'fa fa-exchange'
	  },
	  {
	    name: 'Export data',
	    url: '/admin/p/batchExport',
	    icon: 'fa fa-exchange'
	  },
    {
      name: 'GITHUB',
      url: 'https://github.com/jsoagger',
//      icon: 'icon-github',
      class: 'mt-auto',
      variant: 'success',
      attributes: { target: '_blank', rel: "noopener" },
    },
    {
      name: 'JSOAGGER',
      url: 'http://www.jsoagger.tech',      
//      icon: 'icon-document',
      variant: 'danger',
      attributes: { target: '_blank', rel: "noopener" },
    },
  ],
};
