import 'dart:async';
import 'dart:convert';
import "dart:io";

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';

// import pexels
import "package:pexels/pexels.dart" as pexels;
export 'index.dart';

// create client instance
var client = pexels.PexelsClient(
    '563492ad6f917000010000010eafc146e5e74d0a980cbadf8314b3ca');

var link = "";

Future<Album> fetchAlbum() async {
// get a random photo
  var p = await client.getPhoto();
  link = p.get(pexels.ImageFormats.portrait);
  stdout.write(link);

  var photoSearch =
      await client.searchPhotos("Nature", page: 0, resultsPerPage: 1);
  var link2 = photoSearch[0];
  var photo = link2.get(pexels.ImageFormats.portrait);
  stdout.write(photo);

  final result = jsonEncode({"rand": link, "search": photo});

  if (link != null) {
    return Album.fromJson(jsonDecode(result));
  } else {
    throw Exception('Failed to load album');
  }
}

class Album {
  final String photoLinkRandom;
  final String photoLinkSearch;

  Album({this.photoLinkSearch, this.photoLinkRandom});

  factory Album.fromJson(Map<String, dynamic> json) {
    return Album(
        photoLinkRandom: json['photoLinkRandom'],
        photoLinkSearch: json['photoLinkSearch']);
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key key, this.title}) : super(key: key);

  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  Future<Album> futureAlbum;

  @override
  void initState() {
    super.initState();
    futureAlbum = fetchAlbum();
  }

  void recarregar() async {
    var p = await client.getPhoto();
    setState(() {
      link = p.get(pexels.ImageFormats.portrait);
      stdout.write(link);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: FutureBuilder<Album>(
          future: futureAlbum,
          builder: (context, AsyncSnapshot<Album> snapshot) {
            if (snapshot.hasData) {
              return new Scaffold(
                body: Container(
                    height: double.infinity,
                    width: double.infinity,
                    child: new Image.network(
                      link,
                      fit: BoxFit.cover,
                      alignment: Alignment.center,
                    )),
                floatingActionButton: Row(
                  mainAxisAlignment: MainAxisAlignment.end,
                  children: <Widget>[
                    FloatingActionButton(
                      onPressed: recarregar,
                      tooltip: 'Carregar outra imagem',
                      child: Icon(Icons.cached),
                    ),
                    SizedBox(
                      width: 10.0,
                    ),
                    // FloatingActionButton(
                    //   // onPressed: _decrementCounter,
                    //   // tooltip: 'Diminuir',
                    //   child: Icon(Icons.remove),
                    // ),
                  ],
                ), // This trailing comma makes a,
              );
            } else if (snapshot.hasError) {
              return Text("${snapshot.error}");
            }

            // By default, show a loading spinner.
            return CircularProgressIndicator();
          },
        ),
      ),
    );
  }
}
