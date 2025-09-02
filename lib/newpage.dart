import 'package:flutter/material.dart';

class CreateClassroomPage extends StatefulWidget {
  const CreateClassroomPage({super.key});

  @override
  State<CreateClassroomPage> createState() => _CreateClassroomPageState();
}

class _CreateClassroomPageState extends State<CreateClassroomPage> {
  final _formKey = GlobalKey<FormState>();

  final TextEditingController _roomNameController = TextEditingController();
  final TextEditingController _capacityController = TextEditingController();
  String? _selectedBuilding;
  bool _hasProjector = false;
  bool _hasAirConditioning = false;

  final List<String> _buildings = [
    "Bloco A",
    "Bloco B",
    "Bloco C",
    "Biblioteca",
  ];

  @override
  void dispose() {
    _roomNameController.dispose();
    _capacityController.dispose();
    super.dispose();
  }

  void _saveClassroom() {
    if (_formKey.currentState!.validate()) {
      final newClassroom = {
        "nome": _roomNameController.text.trim(),
        "capacidade": int.parse(_capacityController.text.trim()),
        "predio": _selectedBuilding,
        "projetor": _hasProjector,
        "arCondicionado": _hasAirConditioning,
      };

      // Aqui futuramente você pode enviar para o backend / banco de dados
      debugPrint("Sala cadastrada: $newClassroom");

      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text("Sala criada com sucesso!")),
      );

      Navigator.pop(context);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Criar Sala de Aula"),
        centerTitle: true,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: ListView(
            children: [
              TextFormField(
                controller: _roomNameController,
                decoration: const InputDecoration(
                  labelText: "Nome da Sala",
                  border: OutlineInputBorder(),
                ),
                validator: (value) =>
                    value == null || value.isEmpty ? "Informe o nome da sala" : null,
              ),
              const SizedBox(height: 16),
              TextFormField(
                controller: _capacityController,
                keyboardType: TextInputType.number,
                decoration: const InputDecoration(
                  labelText: "Capacidade",
                  border: OutlineInputBorder(),
                ),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return "Informe a capacidade";
                  }
                  if (int.tryParse(value) == null || int.parse(value) <= 0) {
                    return "Informe um número válido";
                  }
                  return null;
                },
              ),
              const SizedBox(height: 16),
              DropdownButtonFormField<String>(
                decoration: const InputDecoration(
                  labelText: "Prédio",
                  border: OutlineInputBorder(),
                ),
                initialValue: _selectedBuilding,
                items: _buildings.map((b) {
                  return DropdownMenuItem(
                    value: b,
                    child: Text(b),
                  );
                }).toList(),
                onChanged: (value) {
                  setState(() => _selectedBuilding = value);
                },
                validator: (value) => value == null ? "Selecione o prédio" : null,
              ),
              const SizedBox(height: 16),
              SwitchListTile(
                title: const Text("Possui projetor"),
                value: _hasProjector,
                onChanged: (value) => setState(() => _hasProjector = value),
              ),
              SwitchListTile(
                title: const Text("Possui ar-condicionado"),
                value: _hasAirConditioning,
                onChanged: (value) =>
                    setState(() => _hasAirConditioning = value),
              ),
              const SizedBox(height: 24),
              ElevatedButton.icon(
                icon: const Icon(Icons.save),
                onPressed: _saveClassroom,
                label: const Text("Salvar Sala"),
                style: ElevatedButton.styleFrom(
                  minimumSize: const Size(double.infinity, 50),
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}