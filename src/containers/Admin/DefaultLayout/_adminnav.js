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
      name: 'Types',
      url: '/admin/p/types',
      icon: 'fa fa-cubes'
    },
    {
      name: 'Lifecycles',
      url: '/admin/p/lifecycles',
      icon: 'fa fa-flash'
    },
    {
      name: 'Templates',
      icon: 'fa fa-list-ul',
      children: [
        {
            name: 'Folder templates',
            url: '/admin/p/folderTemplates',
            icon: 'fa fa-folder-o'
        },
        {
            name: 'Email templates',
            url: '/admin/p/emailTemplates',
            icon: 'fa fa-envelope-open-o'
        },
        {
            name: 'Team templates',
            url: '/admin/p/teamTemplates',
            icon: 'fa fa-users'
        },
      ],
    },
    {
      name: 'Business rules',
      url: '/admin/p/businessRules',
      icon: 'fa fa-puzzle-piece'
    },
    {
      name: 'Members',
      icon: 'fa fa-users',
      children: [
    	  {
              name: 'Manage',
              url: '/admin/p/manageMembers',
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
      name: 'Misc',
      wrapper: {
        element: '',
        attributes: {},
      },
    },
    {
	    name: 'Load data',
	    url: '/admin/p/batchLoad',
	    icon: 'fa fa-exchange'
	  },
    {
      name: 'Enumerations',
      url: '/admin/p/enumerations',
      icon: 'fa fa-list-alt'
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
