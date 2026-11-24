/* =====================================================================
   Configuración del panel de administración (Decap CMS)
   ---------------------------------------------------------------------
   ÚNICO DATO QUE DEBES CAMBIAR: GITHUB_REPO  ->  "usuario/nombre-del-repo"
   (el repositorio de GitHub donde vive este sitio).
   ===================================================================== */
var GITHUB_REPO = 'lolvgf/swan-website';
var GITHUB_BRANCH = 'main';

var isLocal = ['localhost', '127.0.0.1'].includes(window.location.hostname);

var awardOptions = [
  { label: 'Woman of the Year', value: 'woman-of-the-year' },
  { label: 'Rising Swan', value: 'rising-swan' },
  { label: 'Lifetime Achievement', value: 'lifetime-achievement' },
  { label: 'Humanitarian Award', value: 'humanitarian' },
  { label: 'Woman of Recognition (2020)', value: 'woman-of-recognition' },
];
var categoryOptions = ['Professional Achievement', 'Mentorship of Women', 'Community Engagement', 'Transformative Leadership'];

var config = {
  backend: {
    name: 'github',
    repo: GITHUB_REPO,
    branch: GITHUB_BRANCH,
    base_url: window.location.origin,
    auth_endpoint: 'api/auth',
    commit_messages: {
      create: 'Add {{collection}} "{{slug}}"',
      update: 'Update {{collection}} "{{slug}}"',
      delete: 'Delete {{collection}} "{{slug}}"',
      uploadMedia: 'Upload "{{path}}"',
      deleteMedia: 'Delete "{{path}}"',
    },
  },
  local_backend: isLocal,
  site_url: window.location.origin,
  display_url: window.location.origin,
  logo_url: '/images/logo.png',
  media_folder: 'public/images',
  public_folder: '/images',
  slug: { encoding: 'ascii', clean_accents: true },

  collections: [
    /* ---------------- Ajustes generales ---------------- */
    {
      name: 'settings', label: 'Site settings', label_singular: 'Settings', editor: { preview: false },
      files: [
        {
          name: 'site', label: 'General settings', file: 'src/content/settings/site.json',
          fields: [
            { name: 'name', label: 'Short name', widget: 'string' },
            { name: 'fullName', label: 'Full name', widget: 'string' },
            { name: 'tagline', label: 'Tagline', widget: 'string' },
            { name: 'description', label: 'Description (SEO / footer)', widget: 'text' },
            { name: 'email', label: 'Email', widget: 'string' },
            { name: 'mailingAddress', label: 'Mailing address', widget: 'text' },
            { name: 'facebook', label: 'Facebook URL', widget: 'string', required: false },
            { name: 'linkedin', label: 'LinkedIn URL', widget: 'string', required: false },
            { name: 'donateUrl', label: 'Donate link (general fund)', widget: 'string', hint: 'PayPal, Zeffy, Givebutter, etc.' },
            { name: 'scholarshipDonateUrl', label: 'Donate link (scholarship fund)', widget: 'string', required: false },
            { name: 'ticketsUrl', label: 'Banquet tickets link', widget: 'string', required: false },
            { name: 'ticketsLabel', label: 'Banquet tickets button text', widget: 'string', required: false },
            { name: 'nominationFormEn', label: 'Nomination form (English)', widget: 'string' },
            { name: 'nominationFormEs', label: 'Nomination form (Spanish)', widget: 'string', required: false },
            { name: 'nominationsOpen', label: 'Show "nominations open" notice', widget: 'boolean', default: true },
            { name: 'nominationsDeadline', label: 'Nominations deadline (text)', widget: 'string', required: false, hint: 'e.g. June 30' },
            { name: 'scholarshipFormEn', label: 'Scholarship application (English)', widget: 'string' },
            { name: 'scholarshipFormEs', label: 'Scholarship application (Spanish)', widget: 'string', required: false },
            { name: 'boardApplicationForm', label: 'Board application (online form URL)', widget: 'string', required: false, hint: 'If set, the button opens this form instead of the PDF.' },
            { name: 'boardApplicationFile', label: 'Board application (PDF path)', widget: 'string', required: false },
            { name: 'newsletterAction', label: 'Mailchimp form URL', widget: 'string', required: false },
            { name: 'announcement', label: 'Announcement bar text', widget: 'string', required: false, hint: 'Leave empty to hide the bar at the top of every page.' },
            { name: 'announcementLink', label: 'Announcement link', widget: 'string', required: false },
            { name: 'announcementLinkLabel', label: 'Announcement link text', widget: 'string', required: false },
          ],
        },
        {
          name: 'sponsorship', label: 'Sponsorship levels', file: 'src/content/settings/sponsorship.json',
          fields: [
            { name: 'intro', label: 'Intro text', widget: 'text' },
            { name: 'levels', label: 'Levels', widget: 'list', summary: '{{fields.name}} – ${{fields.amount}}',
              fields: [
                { name: 'name', label: 'Level name', widget: 'string' },
                { name: 'amount', label: 'Amount (USD)', widget: 'number', value_type: 'int' },
                { name: 'featured', label: 'Highlight this level', widget: 'boolean', default: false },
                { name: 'perks', label: 'Benefits', widget: 'list', field: { name: 'perk', label: 'Benefit', widget: 'string' } },
              ] },
            { name: 'otherNote', label: 'Note for other amounts', widget: 'text' },
          ],
        },
      ],
    },

    /* ---------------- Textos de las páginas ---------------- */
    {
      name: 'pages', label: 'Page text', label_singular: 'Page', folder: 'src/content/pages', extension: 'md', format: 'frontmatter',
      create: false, delete: false, editor: { preview: false },
      fields: [
        { name: 'title', label: 'Title', widget: 'string' },
        { name: 'subtitle', label: 'Subtitle', widget: 'text', required: false },
        { name: 'heroImage', label: 'Header image', widget: 'image', required: false },
        { name: 'body', label: 'Text', widget: 'markdown', required: false },
      ],
    },

    /* ---------------- Ganadoras ---------------- */
    {
      name: 'honorees', label: 'Award recipients', label_singular: 'Recipient', folder: 'src/content/honorees', extension: 'md', format: 'frontmatter',
      create: true, slug: '{{year}}-{{slug}}', identifier_field: 'name', summary: '{{year}} · {{name}} ({{award}})',
      sortable_fields: ['year', 'name', 'award'], view_groups: [{ label: 'Award', field: 'award' }, { label: 'Year', field: 'year' }],
      editor: { preview: false },
      fields: [
        { name: 'name', label: 'Name', widget: 'string' },
        { name: 'year', label: 'Year', widget: 'number', value_type: 'int' },
        { name: 'award', label: 'Award', widget: 'select', options: awardOptions, default: 'woman-of-the-year' },
        { name: 'category', label: 'Category (Women of the Year only)', widget: 'select', options: categoryOptions, required: false },
        { name: 'title', label: 'Job title / organization', widget: 'string', required: false },
        { name: 'photo', label: 'Photo', widget: 'image', required: false },
        { name: 'note', label: 'Footnote', widget: 'string', required: false },
        { name: 'body', label: 'Bio (optional)', widget: 'markdown', required: false },
      ],
    },

    /* ---------------- Becarias ---------------- */
    {
      name: 'scholars', label: 'Scholarship recipients', label_singular: 'Scholarship recipient', folder: 'src/content/scholars', extension: 'md', format: 'frontmatter',
      create: true, slug: '{{year}}-{{slug}}', identifier_field: 'name', summary: '{{year}} · {{name}}', sortable_fields: ['year', 'name'], editor: { preview: false },
      fields: [
        { name: 'name', label: 'Name', widget: 'string' },
        { name: 'year', label: 'Year', widget: 'number', value_type: 'int' },
      ],
    },

    /* ---------------- Junta directiva ---------------- */
    {
      name: 'board', label: 'Board members', label_singular: 'Board member', folder: 'src/content/board', extension: 'md', format: 'frontmatter',
      create: true, identifier_field: 'name', summary: '{{order}} · {{name}}', sortable_fields: ['order', 'name'], editor: { preview: false },
      fields: [
        { name: 'name', label: 'Name', widget: 'string' },
        { name: 'role', label: 'Role', widget: 'string', default: 'Board Member' },
        { name: 'photo', label: 'Photo', widget: 'image', required: false },
        { name: 'order', label: 'Display order', widget: 'number', value_type: 'int', default: 99 },
      ],
    },

    /* ---------------- In Memoriam ---------------- */
    {
      name: 'memoriam', label: 'In Memoriam', label_singular: 'Person', folder: 'src/content/memoriam', extension: 'md', format: 'frontmatter',
      create: true, identifier_field: 'name', summary: '{{name}}', editor: { preview: false },
      fields: [
        { name: 'name', label: 'Name', widget: 'string' },
        { name: 'photo', label: 'Photo', widget: 'image', required: false },
        { name: 'years', label: 'Years (optional)', widget: 'string', required: false, hint: 'e.g. 1940 – 2023' },
        { name: 'order', label: 'Display order', widget: 'number', value_type: 'int', default: 99 },
      ],
    },

    /* ---------------- Eventos ---------------- */
    {
      name: 'events', label: 'Events', label_singular: 'Event', folder: 'src/content/events', extension: 'md', format: 'frontmatter',
      create: true, slug: '{{year}}-{{slug}}', identifier_field: 'title', summary: '{{date}} · {{title}}', sortable_fields: ['date', 'title'], editor: { preview: false },
      fields: [
        { name: 'title', label: 'Title', widget: 'string' },
        { name: 'date', label: 'Date', widget: 'datetime', format: 'YYYY-MM-DD', date_format: 'YYYY-MM-DD', time_format: false, picker_utc: true },
        { name: 'time', label: 'Time (text)', widget: 'string', required: false, hint: 'e.g. 5:30 PM' },
        { name: 'location', label: 'Location', widget: 'string', required: false },
        { name: 'image', label: 'Image / flyer', widget: 'image', required: false },
        { name: 'ctaLabel', label: 'Button text', widget: 'string', required: false, hint: 'e.g. Buy tickets' },
        { name: 'ctaUrl', label: 'Button link', widget: 'string', required: false },
        { name: 'featured', label: 'Show on the home page', widget: 'boolean', default: false },
        { name: 'body', label: 'Description', widget: 'markdown', required: false },
      ],
    },
  ],
};

CMS.init({ config: config });
