import { networkInterfaces } from 'os';

// Função para pegar o MAC address da máquina
function getMachineId(): string {
  const nets = networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]!) {
      if (net.mac && net.mac !== '00:00:00:00:00:00') {
        return net.mac.replace(/:/g, ''); // Remove os ":" do MAC address
      }
    }
  }
  return '000000000000'; // Retorna um ID padrão caso não encontre o MAC
}

// Função para gerar o ID único combinando timestamp + ID da máquina + valor aleatório
export function generateUniqueId(): string {
  const timestamp = Date.now().toString(36); // Timestamp em base-36
  const machineId = getMachineId(); // ID da máquina (MAC address ou similar)
  const randomPart = Math.random().toString(36).substring(2, 8); // Parte aleatória

  return `${machineId}-${timestamp}-${randomPart}`; // Combina tudo em um ID único
}

// Função para decodificar o ID e obter o timestamp original
export function decodeUniqueId(uniqueId: string): { creationDate: Date, machineId: string } {
  const parts = uniqueId.split('-');
  if (parts.length !== 3) {
    throw new Error('Invalid ID format');
  }
  
  const machineId = parts[0]; // Primeiro elemento é o ID da máquina
  const timestamp = parseInt(parts[1], 36); // Segundo elemento é o timestamp em base-36

  return { 
    creationDate: new Date(timestamp), // Converte o timestamp para Date
    machineId // Retorna o ID da máquina
  };
}
