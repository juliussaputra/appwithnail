/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 var serviceSpec = "";

 var app = {
    // Application Constructor
    initialize: function() {
      document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
      this.receivedEvent('deviceready');
      console.log('ON DEVICE READY');

      var btn1 = document.getElementById('loginbutton1');
      btn1.addEventListener('click', this.click1.bind(this), false);

      var btn2 = document.getElementById('loginbutton2');
      btn2.addEventListener('click', this.click2.bind(this), false);

      var btn3 = document.getElementById('getServiceNames');
      btn3.addEventListener('click', this.getServiceNames.bind(this), false);

      var btn4 = document.getElementById('getEndpointURL');
      btn4.addEventListener('click', this.getEndpointUrl.bind(this), false);

      var btn5 = document.getElementById('getDisplayName');
      btn5.addEventListener('click', this.getDisplayName.bind(this), false);

      var btn6 = document.getElementById('getToken');
      btn6.addEventListener('click', this.getToken.bind(this), false);

      var btn7 = document.getElementById('getServiceUrl');
      btn7.addEventListener('click', this.getServiceUrl.bind(this), false);

      var btn8 = document.getElementById('removeService');
      btn8.addEventListener('click', this.removeService.bind(this), false);

      var btn9 = document.getElementById('clearAllServices');
      btn9.addEventListener('click', this.clearAllServices.bind(this), false);

      var btn10 = document.getElementById('serialize');
      btn10.addEventListener('click', this.serialize.bind(this), false);

      var btn11 = document.getElementById('parse');
      btn11.addEventListener('click', this.parse.bind(this), false);

      var para = document.createElement("p");
      para.setAttribute("id", "textID")
      var element = document.getElementById("deviceready");
      element.appendChild(para);
    },


    click1: function(){
      console.log('Button authorizeProtocols singleton Clicked');
      var para = document.getElementById("textID");
      while(para.firstChild){
        para.removeChild(para.firstChild);
      }
      EduIDPlugin.authorizeProtocols(["org.moodle.moodle_mobile_app"],
        function(msg){
          document.getElementById('deviceready').querySelector('.received').innerHTML = "PLUGIN SUCCESSFUL";
          console.log("MSG : " + msg);
          var para = document.getElementById("textID");
        //var node = document.createTextNode("api_key : " + msg );
          var node = document.createTextNode(msg);
          para.appendChild(node);
          para.style.textAlign = "center";
          para.style.right = "10%";
        },
        function(msg){
          document.getElementById('deviceready').querySelector('.received').innerHTML = "NO SERVICES";
          var para = document.getElementById("textID");
          var node = document.createTextNode("No Services Access");
          para.appendChild(node);
        }
      );
    },

    click2: function(){

      console.log('Button2 authorizeProtocols NON-singleton Clicked');
      var para = document.getElementById("textID");
      while(para.firstChild){
        para.removeChild(para.firstChild)
      }
      EduIDPlugin.authorizeProtocols2(["org.moodle.moodle_mobile_app"],
        function(msg){
          document.getElementById('deviceready').querySelector('.received').innerHTML = "PLUGIN SUCCESSFUL";
          console.log("MSG : " + msg);
          var para = document.getElementById("textID");
          //var node = document.createTextNode("api_key : " + msg );
          var node = document.createTextNode(msg);
          para.appendChild(node);
          },
        function(msg){
          document.getElementById('deviceready').querySelector('.received').innerHTML = "NO SERVICES";
          var para = document.getElementById("textID");
          var node = document.createTextNode("No Services Access");
          para.appendChild(node);
        }
      );

    },

    getServiceNames: function(){

      console.log('Button getServiceNames clicked');
      var para = document.getElementById("textID");
      while(para.firstChild){
        para.removeChild(para.firstChild)
      }
      EduIDPlugin.serviceNames(
        function(msg){
          document.getElementById('deviceready').querySelector('.received').innerHTML = "PLUGIN SUCCESSFUL";
          console.log("MSG : " + msg);
          let services = new Array();
          let res = "";
          for (i = 0 ; i < msg.length; i++){
            res += msg[i] + "\n";
          }

          var para = document.getElementById("textID");
          var node = document.createTextNode(res);
          para.appendChild(node);
        }
      );

    },

    getEndpointUrl: function(){
      console.log('Button getEndpointURL clicked');
      var para = document.getElementById("textID");
      while(para.firstChild){
        para.removeChild(para.firstChild)
      }
      EduIDPlugin.getEndpointUrl("Wall-E", "org.moodle.moodle_mobile_app",
        function(msg){
          document.getElementById('deviceready').querySelector('.received').innerHTML = "PLUGIN SUCCESSFUL";
          console.log("MSG : " + msg);
          var para = document.getElementById("textID");
          var node = document.createTextNode(msg);
          para.appendChild(node);
        }
      );
    },

    getDisplayName: function(){

      console.log('Button getDisplayName clicked');
      var para = document.getElementById("textID");
      while(para.firstChild){
        para.removeChild(para.firstChild)
      }

      EduIDPlugin.getDisplayName("Wall-E",
        function(msg){
          document.getElementById('deviceready').querySelector('.received').innerHTML = "PLUGIN SUCCESSFUL";
          console.log("MSG : " + msg);
          var para = document.getElementById("textID");
          var node = document.createTextNode(msg);
          para.appendChild(node);
        }
      );

    },

    getToken: function(){

      console.log('Button getToken clicked');
      var para = document.getElementById("textID");
      while(para.firstChild){
        para.removeChild(para.firstChild)
      }
      EduIDPlugin.getServiceToken("Wall-E", "org.moodle.moodle_mobile_app",
        function(msg){
          document.getElementById('deviceready').querySelector('.received').innerHTML = "PLUGIN SUCCESSFUL";
          console.log("MSG : " + msg);
          var para = document.getElementById("textID");
          var node = document.createTextNode(msg);
          para.appendChild(node);
        }
      );

    },

    getServiceUrl: function(){
      console.log('Button getServiceUrl clicked');
      var para = document.getElementById("textID");
      while(para.firstChild){
        para.removeChild(para.firstChild)
      }
      EduIDPlugin.getServiceUrl("Wall-E",
        function(msg){
          document.getElementById('deviceready').querySelector('.received').innerHTML = "PLUGIN SUCCESSFUL";
          console.log("MSG : " + msg);
          var para = document.getElementById("textID");
          var node = document.createTextNode(msg);
          para.appendChild(node);
        },
        function(msg){
          document.getElementById('deviceready').querySelector('.received').innerHTML = "PLUGIN ERROR";
          console.log("MSG : " + msg);
          var para = document.getElementById("textID");
          var node = document.createTextNode(msg);
          para.appendChild(node);
        }
      );

    },

    removeService: function(){
      console.log('Button removeService clicked');
      var para = document.getElementById("textID");
      while(para.firstChild){
        para.removeChild(para.firstChild)
      }
      EduIDPlugin.removeService("Wall-E",
        function(msg){
          document.getElementById('deviceready').querySelector('.received').innerHTML = "PLUGIN SUCCESSFUL";
          var para = document.getElementById("textID");
          var node = document.createTextNode("Wall-E service Removed");
          para.appendChild(node);
        }
      );
    },

    clearAllServices: function(){
      console.log('Button clearAllServices clicked');
      var para = document.getElementById("textID");
      while(para.firstChild){
        para.removeChild(para.firstChild)
      }
      EduIDPlugin.clearAllServices(
        function(msg){
          document.getElementById('deviceready').querySelector('.received').innerHTML = "PLUGIN SUCCESSFUL";
          var para = document.getElementById("textID");
          var node = document.createTextNode("All services Removed");
          para.appendChild(node);
        }
      );
    },

    serialize: function() {
      console.log('Button serialize clicked');
      var para = document.getElementById("textID");
      while(para.firstChild){
        para.removeChild(para.firstChild)
      }
      EduIDPlugin.serialize(
        function(msg){
          document.getElementById('deviceready').querySelector('.received').innerHTML = "PLUGIN SUCCESSFUL";
          var para = document.getElementById("textID");
          var node = document.createTextNode("Serialized!");
          para.appendChild(node);
          serviceSpec = msg
        }
      );
    },

    parse: function(){
      console.log('Button parse clicked');
      var para = document.getElementById("textID");
      while(para.firstChild){
        para.removeChild(para.firstChild)
      }
      EduIDPlugin.parse( serviceSpec,
        function(msg){
          document.getElementById('deviceready').querySelector('.received').innerHTML = "PLUGIN SUCCESSFUL";
          var para = document.getElementById("textID");
          var node = document.createTextNode("Parsed successfully");
          para.appendChild(node);
        },
        function(msg){
          document.getElementById('deviceready').querySelector('.received').innerHTML = "PLUGIN ERROR";
          console.log("MSG : " + msg);
          var para = document.getElementById("textID");
          var node = document.createTextNode(msg);
          para.appendChild(node);
        }
      );
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
      var parentElement = document.getElementById(id);
      var listeningElement = parentElement.querySelector('.listening');
      var receivedElement = parentElement.querySelector('.received');

      listeningElement.setAttribute('style', 'display:none;');
      receivedElement.setAttribute('style', 'display:block;');

      console.log('Received Event: ' + id);
    }

  };

  app.initialize();
