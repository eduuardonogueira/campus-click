import 'package:flutter/material.dart';
import 'create_classroom_page.dart';

class ClassroomListPage extends StatefulWidget {
  const ClassroomListPage({super.key});

  @override
  State<ClassroomListPage> createState() => _ClassroomListPageState();
}

class _ClassroomListPageState extends State<ClassroomListPage> {
  final List<Map<String, dynamic>> _classrooms = [];

  Future<void> _openCreatePage() async {
    final result = await Navigator.push(
      context,
      MaterialPageRoute(builder: (_) => const CreateClassroomPage()),
    );

    if (result != null && result is Map<String, dynamic>) {
      setState(() => _classrooms.add(result));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Salas de Aula"),
        centerTitle: true,
      ),
      body: _classrooms.isEmpty
          ? const Center(child: Text("Nenhuma sala cadastrada ainda"))
          : ListView.builder(
              itemCount: _classrooms.length,
              itemBuilder: (context, index) {
                final sala = _classrooms[index];
                return Card(
                  margin: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                  child: ListTile(
                    leading: const Icon(Icons.meeting_room),
                    title: Text(sala["nome"]),
                    subtitle: Text(
                        "Capacidade: ${sala["capacidade"]} - ${sala["predio"]}"),
                    trailing: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        if (sala["projetor"])
                          const Icon(Icons.videocam, color: Colors.blue),
                        if (sala["arCondicionado"])
                          const Icon(Icons.ac_unit, color: Colors.lightBlue),
                      ],
                    ),
                  ),
                );
              },
            ),
      floatingActionButton: FloatingActionButton(
        onPressed: _openCreatePage,
        child: const Icon(Icons.add),
      ),
    );
  }
}
