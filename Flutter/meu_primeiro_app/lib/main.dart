import 'package:flutter/material.dart';
import 'package:flutter/foundation.dart';
import 'src/home/index.dart' as home;
import 'src/image_search/index.dart' as search;
import 'src/busca_cep/index.dart' as viaCep;

String titulo = 'Contador';
void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.deepPurple,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: MyStatefulWidget(),
    );
  }
}

class MyStatefulWidget extends StatefulWidget {
  MyStatefulWidget({Key key}) : super(key: key);

  @override
  _MyStatefulWidgetState createState() => _MyStatefulWidgetState();
}

class _MyStatefulWidgetState extends State<MyStatefulWidget> {
  int _selectedIndex = 0;
  static const TextStyle optionStyle =
      TextStyle(fontSize: 30, fontWeight: FontWeight.bold);

  static const List<Widget> _widgetOptions = <Widget>[
    Text(
      'Index 0: Home',
      style: optionStyle,
    ),
    Text(
      'Index 1: Search Image',
      style: optionStyle,
    ),
    Text(
      'Index 2: Perfil',
      style: optionStyle,
    ),
  ];

  metodoSwitch(key) {
    switch (key) {
      case 0:
        titulo = 'Contador';
        return home.MyHomePage(title: titulo);
        break;
      case 1:
        titulo = 'Buscador Imagens';
        return search.MyHomePage(title: titulo);
        break;
      default:
        titulo = 'CEP';
        return viaCep.BuscaCep(title: titulo);
        break;
    }
  }

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
    metodoSwitch(index);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(titulo),
      ),
      body: Center(child: metodoSwitch(_selectedIndex)

          //     // _widgetOptions.elementAt(_selectedIndex),
          ),
      bottomNavigationBar: BottomNavigationBar(
        items: const <BottomNavigationBarItem>[
          BottomNavigationBarItem(
            icon: Icon(Icons.home),
            title: Text('Home'),
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.image_search),
            title: Text('Search Images'),
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.house_outlined),
            title: Text('CEP'),
          ),
        ],
        currentIndex: _selectedIndex,
        backgroundColor: Colors.deepPurple,
        selectedItemColor: Colors.amber[800],
        onTap: _onItemTapped,
      ),
    );
  }
}
