import 'package:flutter/material.dart';
import 'create_classroom_page.dart';

class ClassroomListPage extends StatefulWidget {
  const ClassroomListPage({super.key});

  @override
  State<ClassroomListPage> createState() => _ClassroomListPageState();
}

class _ClassroomListPageState extends State<ClassroomListPage> {
  final List<Map<String, dynamic>> _classrooms = [];

  // NOVO: controller e texto da pesquisa
  final TextEditingController _searchController = TextEditingController();
  String _searchText = "";

  Future<void> _openCreatePage() async {
    final result = await Navigator.push(
      context,
      MaterialPageRoute(builder: (_) => const CreateClassroomPage()),
    );

    if (result != null && result is Map<String, dynamic>) {
      setState(() => _classrooms.add(result));
    }
  }

  // NOVO: listener do searchController
  @override
  void initState() {
    super.initState();
    _searchController.addListener(() {
      setState(() {
        _searchText = _searchController.text;
      });
    });
  }

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    // NOVO: filtra salas pelo texto da pesquisa
    final filteredClassrooms = _classrooms
        .where((sala) =>
            sala["nome"].toLowerCase().contains(_searchText.toLowerCase()))
        .toList();

    return Scaffold(
      appBar: AppBar(
        title: const Text("Sistema de Reservas - CampusClick"),
        centerTitle: true,
      ),
      body: Column(
        children: [
          // NOVO: barra de pesquisa no topo esquerdo
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Align(
              alignment: Alignment.centerRight,
              child: Padding(
              padding: const EdgeInsets.fromLTRB(0, 24, 250, 0), // left, top, right, bottom
              child: SizedBox(
                width: 250,
                height: 40,
                child: TextField(
                  controller: _searchController,
                  decoration: InputDecoration(
                    hintText: "Pesquisar salas...",
                    prefixIcon: const Icon(Icons.search),
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                  ),
                ),
              ),
            ),
          ),
        ),
          // Lista de salas
          Expanded(
            child: filteredClassrooms.isEmpty
                ? const Center(child: Text("Nenhuma sala cadastrada ainda"))
                : ListView.builder(
                    itemCount: filteredClassrooms.length,
                    itemBuilder: (context, index) {
                      final sala = filteredClassrooms[index];
                      return Card(
                        margin: const EdgeInsets.symmetric(
                            horizontal: 250, vertical: 10),
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
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _openCreatePage,
        child: const Icon(Icons.add),
      ),
    );
  }
}
