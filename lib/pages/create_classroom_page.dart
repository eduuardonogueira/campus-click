import 'package:flutter/material.dart';

class CreateClassroomPage extends StatefulWidget {
  const CreateClassroomPage({super.key});

  @override
  State<CreateClassroomPage> createState() => _CreateClassroomPageState();
}

class _CreateClassroomPageState extends State<CreateClassroomPage> {
  final _formKey = GlobalKey<FormState>();

  final TextEditingController _capacityController = TextEditingController();
  String? _selectedRoom;
  String? _selectedBuilding;
  bool _hasProjector = false;
  bool _hasAirConditioning = false;

  final List<String> _rooms = [
    "Laboratório 1",
    "Laboratório 2",
    "Laboratório 3",
    "Laboratório 4",
  ];

  final List<String> _buildings = [
    "Pavilhão de Salas de Aula",
  ];

  @override
  void dispose() {
    _capacityController.dispose();
    super.dispose();
  }

  void _saveClassroom() {
    if (_formKey.currentState!.validate()) {
      final newClassroom = {
        "nome": _selectedRoom,
        "capacidade": int.parse(_capacityController.text.trim()),
        "predio": _selectedBuilding,
        "projetor": _hasProjector,
        "arCondicionado": _hasAirConditioning,
      };

      Navigator.pop(context, newClassroom);

      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text("Sala criada com sucesso!")),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Criar Sala de Aula"),
        centerTitle: true,
      ),
      body: LayoutBuilder(
        builder: (context, constraints) {
          // Define largura do formulário para manter 250px de margem em telas grandes
          double formWidth =
              constraints.maxWidth > 800 ? 800 : constraints.maxWidth - 32;

          return Center(
            child: Container(
              width: formWidth,
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
              child: Form(
                key: _formKey,
                child: ListView(
                  children: [
                    DropdownButtonFormField<String>(
                      decoration: const InputDecoration(
                        labelText: "Nome da Sala",
                        border: OutlineInputBorder(),
                      ),
                      value: _selectedRoom,
                      items: _rooms.map((r) {
                        return DropdownMenuItem(
                          value: r,
                          child: Text(r),
                        );
                      }).toList(),
                      onChanged: (value) {
                        setState(() => _selectedRoom = value);
                      },
                      validator: (value) =>
                          value == null ? "Selecione uma sala" : null,
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
                        if (int.tryParse(value) == null ||
                            int.parse(value) <= 0) {
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
                      value: _selectedBuilding,
                      items: _buildings.map((b) {
                        return DropdownMenuItem(
                          value: b,
                          child: Text(b),
                        );
                      }).toList(),
                      onChanged: (value) {
                        setState(() => _selectedBuilding = value);
                      },
                      validator: (value) =>
                          value == null ? "Selecione o prédio" : null,
                    ),
                    const SizedBox(height: 16),
                    SwitchListTile(
                      title: const Text("Possui projetor"),
                      value: _hasProjector,
                      onChanged: (value) =>
                          setState(() => _hasProjector = value),
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
        },
      ),
    );
  }
}
