What & why
==========

From time to time we need to make download features in our web applications. 
It is not a big deal when you need to give a link to file to be downloaded.
Hovewer you might need to give possibility of downloading file needs to be generated.
For instance export data to Excel, PDF of make an archive. It might take a lot of time 
to generate file. Actually it is pretty bad experience - click a link, wait for a while,
take some tea and only then download will start. 

In order to improve user experience of waiting I created small JavaScript plugin 
which indicates that download will start, user just need to wait. It is extremly easy solution
with integration in unobtrusive style. 

How it works
------------

When user clicks a link (or submit a form) which should cause download this plugin opens new window
with text 'Please wait for download start' and simple dots animation. User's action (click or submit)
gets redirected to this new window. It means that download will start in this window. 
It makes great benefit to user. While website performs generation of file - user can continue using it 
in his main browser window.

Installation
------------

In order to install WaitForDownload plugin you just need perform two easy steps:

+ Add script to page. You can put in anywhere.
`<script type="text/javascript" src="js/wait-for-download.js"></script>`
+ Add attribute `data-wfd` to elements will cause download action. You can use only `a` and `form` tags with this attribute.

This is it! Click on link and download will start in new window.

Customization
-------------

This plugin has some texts and pretty simple styles. It would be stupid to hardcode them, so you can change them.
Let me provide you with default options for WaitForDownload plugin
	
	{
        text: {
            title: 'Download',
            wait: 'Please wait for download starting',
            close: 'Close when done'
        },
        css: {
            body: 'padding: 40px 20px; background-color: #E5E5E5; color: #00002E;',
            text: 'font-weight: bold;',
            close: 'color: #00318E; font-weight: normal;'
        },
        window: {
            height: 300,
            width: 400
        }
    }

There are two ways to change this value.

### 1. Using data-wfd attributes

It is easier to show an example, then explain. For instance, you need to override text *Please wait for download starting*.
Just add following attribute to link

	data-wfd-text-wait="Usually it takes about 5 minutes to generate report. Please wait"

### 2. Setting new default values

In case you need to set default values for number of links it is better to change defaults. 
Just add following script block after `wait-for-download.js` include

	<script type="text/javascript">
		WaitForDownload.defaultOptions.text.wait = 'Usually it takes about 5 minutes to generate report. Please wait';
	</script>

Advanced usage
--------------

There is no so much advanced things in this plugin. Currently we support only pure JS initialization as well.

	WaitForDownload(
		document.getElementById('downloadReport'), 
		{ 
			text: { 
				wait: 'Usually it takes about 5 minutes to generate report. Please wait' 
			}
		});

Support
-------

This plugin was developed quite rapidly, so it might have bugs. 
I would be happy if someone will use it and found anything could be fixed or improved.
Post an issue or send me a message to rgomolko[*]gmail.com