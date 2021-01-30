import 'dart:async';
import 'dart:convert';
import "dart:io";

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:via_cep/via_cep.dart';

export 'index.dart';

String cep;
String _result;

bool _loading = false;
bool _enableField = true;

class BuscaCep extends StatefulWidget {
  BuscaCep({Key key, this.title}) : super(key: key);

  final String title;

  @override
  _BuscaCep createState() => _BuscaCep();
}

class _BuscaCep extends State<BuscaCep> {
  var _searchCepController = TextEditingController();

  @override
  void initState() {
    super.initState();
    // searchCep();
  }

  Widget _buildSearchCepTextField() {
    return TextField(
      autofocus: true,
      keyboardType: TextInputType.number,
      textInputAction: TextInputAction.done,
      decoration: InputDecoration(labelText: 'Cep'),
      controller: _searchCepController,
      maxLength: 8,
      enabled: _enableField,
      onChanged: (text) {
        setState(() {
          cep = text;
        });
      },
    );
  }

  Widget _buildSearchCepButton() {
    return Padding(
      padding: const EdgeInsets.only(top: 20.0),
      child: RaisedButton(
        onPressed: searchCep,
        child: _loading ? _circularLoading() : Text('Consultar'),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
      ),
    );
  }

  void _searching(bool enable) {
    setState(() {
      _result = enable ? '' : _result;
      _loading = enable;
      _enableField = !enable;
    });
  }

  Future searchCep() async {
    var CEP = new via_cep();

    var result = await CEP.searchCEP('$cep', 'json', '');

    // Sucesso
    if (CEP.getResponse() == 200) {
      _searching(true);

      debugPrint('CEP: ' + CEP.getCEP());
      debugPrint('Logradouro: ' + CEP.getLogradouro());
      debugPrint('Complemento: ' + CEP.getComplemento());
      debugPrint('Bairro: ' + CEP.getBairro());
      debugPrint('Localidade: ' + CEP.getLocalidade());
      debugPrint('UF: ' + CEP.getUF());
      // debugPrint('Unidade: ' + CEP.getUnidade());
      debugPrint('IBGE ' + CEP.getIBGE());
      debugPrint('GIA: ' + CEP.getGIA());

      setState(() {
        _result = CEP.getBody();
      });

      _searching(false);
    } else {
      debugPrint('Código de Retorno: ' + CEP.getResponse().toString());
      debugPrint('Erro: ' + CEP.getBody());
    }
  }

  Widget _circularLoading() {
    return Container(
      height: 15.0,
      width: 15.0,
      child: CircularProgressIndicator(),
    );
  }

  Widget _buildResultForm() {
    return Container(
      padding: EdgeInsets.only(top: 20.0),
      child: Text(_result ?? ''),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        padding: EdgeInsets.all(20.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: <Widget>[
            _buildSearchCepTextField(),
            _buildSearchCepButton(),
            _buildResultForm()
          ],
        ),
      ),
    );
  }

  // By default, show a loading spinner.

}
