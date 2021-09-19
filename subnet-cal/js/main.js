function calculate() {
    // Get input elemets
    const ipAddress = $('#ipAddress').val();
    const subnetMask = $('#subnetMask').val();
    const cidr = $('#cidr').val();
    const subnets = $('#subnets').val();
    const hosts = $('#hosts').val();

    // Clear console
    console.clear();

    if (!validate_ip(ipAddress)) return;

    var result = {};
    
    if (subnetMask != '' && subnetMask != null && subnetMask != undefined) {
        console.log()
        result = calculate_with_subnet_mask(ipAddress, subnetMask);
        print_results(result, 'máscara de subred');
        return;
    }

    if (cidr != '' && cidr != null && cidr != undefined) {
        result = calculate_with_cidr(ipAddress, cidr);
        print_results(result, 'CIDR');
        return;
    }

    if (subnets != '' && subnets != null && subnets != undefined) {
        result = calculate_with_subnets(ipAddress, subnets);
        print_results(result, 'número de subredes');
        return;
    }
    
    if (hosts != '' && hosts != null && hosts != undefined) {
        result = calculate_with_hosts(ipAddress, hosts);
        print_results(result, 'número de hosts');
        return;
    }
}

/**
 * Valida una dirección IP
 * @param {String} ipAddress Dirección IP en decimal
 */
function validate_ip(ipAddress) {
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipAddress)) {
        return true;
    }
    return false;
}

/**
 * Calcula en base al CIDR
 * @param {String} ipAddress Dirección IP en decimal
 * @param {Number} cidr CIDR
 */
function calculate_with_cidr(ipAddress, cidr) {
    // Get IP in array
    const ipFormat = string_to_ip(ipAddress);

    // Get binary IP
    const binaryIP = ip_to_binary(ipFormat);
    // Get IP class
    const ipClass = get_ip_class(ipFormat);
    // Know if IP is private
    const privateIP = is_private(ipFormat);
    // Get subnet mask
    const subnetMask = cidr_to_subnet_mask(cidr);
    // Get wildcard mask
    const wildcardMask = get_wildcard_mask(subnetMask);
    // Get subnet address
    const subnetAddress = get_subnet_address(ipAddress, subnetMask);
    // Get broadcast address
    const broadcastAddress = get_broadcast_address(ipAddress, wildcardMask);
    // Get usable IP range
    const ipRange = get_usable_ip_range(subnetAddress, broadcastAddress);
    // Get subnet bits
    const subnetBits = get_subnet_bits(ipClass, subnetMask);
    // Get subnets
    const subnets = get_subnets(subnetBits);
    // Get host bits
    const hostBits = get_host_bits(wildcardMask);
    // Get hosts
    const hosts = get_hosts(hostBits);

    // Set results
    const result = {
        ipAddress,
        binaryIP,
        ipClass,
        privateIP,
        subnetMask,
        cidr,
        wildcardMask,
        subnetAddress,
        broadcastAddress,
        ipRange,
        subnetBits,
        subnets,
        hostBits,
        hosts
    };

    return result;
}

/**
 * Calcula en base a la máscara de subred
 * @param {String} ipAddress Dirección IP en decimal
 * @param {String} subnetMask Máscara de subred en decimal
 */
function calculate_with_subnet_mask(ipAddress, subnetMask) {
    // Get IP in array
    const ipFormat = string_to_ip(ipAddress);

    // Get binary IP
    const binaryIP = ip_to_binary(ipFormat);
    // Get IP class
    const ipClass = get_ip_class(ipFormat);
    // Know if IP is private
    const privateIP = is_private(ipFormat);
    // Get CIDR
    const cidr = subnet_mask_to_cidr(subnetMask);
    // Get wildcard mask
    const wildcardMask = get_wildcard_mask(subnetMask);
    // Get subnet address
    const subnetAddress = get_subnet_address(ipAddress, subnetMask);
    // Get broadcast address
    const broadcastAddress = get_broadcast_address(ipAddress, wildcardMask);
    // Get usable IP range
    const ipRange = get_usable_ip_range(subnetAddress, broadcastAddress);
    // Get subnet bits
    const subnetBits = get_subnet_bits(ipClass, subnetMask);
    // Get subnets
    const subnets = get_subnets(subnetBits);
    // Get host bits
    const hostBits = get_host_bits(wildcardMask);
    // Get hosts
    const hosts = get_hosts(hostBits);

    // Set results
    const result = {
        ipAddress,
        binaryIP,
        ipClass,
        privateIP,
        subnetMask,
        cidr,
        wildcardMask,
        subnetAddress,
        broadcastAddress,
        ipRange,
        subnetBits,
        subnets,
        hostBits,
        hosts
    };

    return result;
}

/**
 * Calcula en base a la máscara de subred
 * @param {String} ipAddress Dirección IP en decimal
 * @param {Number} subnetsSearched Número de subredes buscadas
 */
function calculate_with_subnets(ipAddress, subnetsSearched) {
    // Get IP in array
    const ipFormat = string_to_ip(ipAddress);

    // Get binary IP
    const binaryIP = ip_to_binary(ipFormat);
    // Get IP class
    const ipClass = get_ip_class(ipFormat);
    // Know if IP is private
    const privateIP = is_private(ipFormat);
    // Get subnet bits
    const subnetBits = get_subnet_bits_by_subnets(subnetsSearched);
    // Get CIDR
    const cidr = get_cidr_by_subnets(ipClass, subnetBits);
    // Get subnet mask
    const subnetMask = cidr_to_subnet_mask(cidr);
    // Get wildcard mask
    const wildcardMask = get_wildcard_mask(subnetMask);
    // Get subnet address
    const subnetAddress = get_subnet_address(ipAddress, subnetMask);
    // Get broadcast address
    const broadcastAddress = get_broadcast_address(ipAddress, wildcardMask);
    // Get usable IP range
    const ipRange = get_usable_ip_range(subnetAddress, broadcastAddress);
    // Get subnets
    const subnets = get_subnets(subnetBits);
    // Get host bits
    const hostBits = get_host_bits(wildcardMask);
    // Get hosts
    const hosts = get_hosts(hostBits);

    // Set results
    const result = {
        ipAddress,
        binaryIP,
        ipClass,
        privateIP,
        subnetMask,
        cidr,
        wildcardMask,
        subnetAddress,
        broadcastAddress,
        ipRange,
        subnetBits,
        subnets,
        hostBits,
        hosts
    };

    return result;
}

/**
 * Calcula en base a la máscara de subred
 * @param {String} ipAddress Dirección IP en decimal
 * @param {Number} hostsSearched Número de hosts buscados
 */
function calculate_with_hosts(ipAddress, hostsSearched) {
    // Get IP in array
    const ipFormat = string_to_ip(ipAddress);

    // Get binary IP
    const binaryIP = ip_to_binary(ipFormat);
    // Get IP class
    const ipClass = get_ip_class(ipFormat);
    // Know if IP is private
    const privateIP = is_private(ipFormat);
    // Get host bits
    const hostBits = get_host_bits_by_hosts(hostsSearched);
    // Get CIDR
    const cidr = get_cidr_by_hosts(ipClass, hostBits);
    // Get subnet mask
    const subnetMask = cidr_to_subnet_mask(cidr);
    // Get wildcard mask
    const wildcardMask = get_wildcard_mask(subnetMask);
    // Get subnet address
    const subnetAddress = get_subnet_address(ipAddress, subnetMask);
    // Get broadcast address
    const broadcastAddress = get_broadcast_address(ipAddress, wildcardMask);
    // Get usable IP range
    const ipRange = get_usable_ip_range(subnetAddress, broadcastAddress);
    // Get subnet bits
    const subnetBits = get_subnet_bits(ipClass, subnetMask);
    // Get subnets
    const subnets = get_subnets(subnetBits);
    // Get hosts
    const hosts = get_hosts(hostBits);

    // Set results
    const result = {
        ipAddress,
        binaryIP,
        ipClass,
        privateIP,
        subnetMask,
        cidr,
        wildcardMask,
        subnetAddress,
        broadcastAddress,
        ipRange,
        subnetBits,
        subnets,
        hostBits,
        hosts
    };

    return result;
}



/**
 * String a formato de IP
 * @param {String} ipAddress Dirección IP en decimal
 */
function string_to_ip(ipAddress) {
    var ipFormat = [];

    // Dividir IP
    const splitIP = ipAddress.split('.');
    // Convertir a decimal
    for (let i = 0; i < 4; i++) {
        ipFormat.push(parseInt(splitIP[i]));
    }

    return ipFormat;
}

/**
 * Pasa una dirección IP a binario
 * @param {Number[]} ipFormat Dirección IP en decimal
 */
function ip_to_binary(ipFormat) {
    var binaryIP = [];

    // Convertir cada segmento a binario
    for (let i = 0; i < ipFormat.length; i++) {
        const binary = ipFormat[i].toString(2);
        binaryIP.push(binary);
    }
    
    return binaryIP.join('.');
}

/**
 * Retorna la clase de IP
 * @param {Number[]} ipFormat Dirección IP en decimal
 */
function get_ip_class(ipFormat) {
    // Clase A
    if (ipFormat[0] >= 0 && ipFormat[0] < 128) return 'A';
    // Clase B
    if (ipFormat[0] >= 128 && ipFormat[0] < 192) return 'B';
    // Clase C
    if (ipFormat[0] >= 192 && ipFormat[0] < 224) return 'C';
    // Clase D
    if (ipFormat[0] >= 224 && ipFormat[0] < 240) return 'D';
    // Clase E
    if (ipFormat[0] >= 240 && ipFormat[0] < 248) return 'E';
}

/**
 * Retorna si la dirección IP es de tipo privada o pública
 * @param {Number[]} ipAddress Dirección IP en decimal
 */
function is_private(ipFormat) {
    // IP privada
    if (ipFormat[0] == 10) return true;
    // IP privada
    if (ipFormat[0] == 172 && ipFormat[1] >= 16 && ipFormat[1] < 32) return true;
    // IP privada
    if (ipFormat[0] == 192 && ipFormat[1] == 168) return true;

    // IP pública
    return false;
}

/**
 * Obtiene la máscara de subred a partir del CIDR
 * @param {Number} cidr CIDR
 */
function cidr_to_subnet_mask(cidr) {
    var subnetMask = [];

    // Obtener máscara de subred
    for (let i = 0; i < 4; i++) {
        var n = Math.min(cidr, 8);
        subnetMask.push(256 - 2 ** (8 - n));
        cidr -= n;
    }
    
    return subnetMask.join('.');
}

/**
 * Obtiene el CIDR a partir de la máscara de subred
 * @param {Number} subnetMask Máscara de subred en decimal
 */
function subnet_mask_to_cidr(subnetMask) {
    var cidr = 0;

    // Pasar máscara de subred a formato
    const subneMaskFormat = string_to_ip(subnetMask);

    // Obtener CIDR
    for (let i = 0; i < 4; i++) {
        let binary = subneMaskFormat[i].toString(2);
        for (let j = 0; j < binary.length; j++) {
            if (binary.charAt(j) === '1') cidr++;
        }
    }
    
    return cidr;
}

/**
 * Obtiene el CIDR apatir del número bits de subred
 * @param {String} ipClass Clase de IP
 * @param {Number} subnetBits Bits de subred
 */
function get_cidr_by_subnets(ipClass, subnetBits) {
    if (ipClass === 'A') return 8 + subnetBits;
    if (ipClass === 'B') return 16 + subnetBits;
    return 24 + subnetBits;
}

/**
 * Obtiene el CIDR apatir del número de host
 * @param {String} ipClass Clase de IP
 * @param {Number} hostBits Bits de host
 */
function get_cidr_by_hosts(ipClass, hostBits) {
    const n = 32 - hostBits;
    return n;
}

/**
 * Obtiene la máscara wildcard
 * @param {String} subnetMask Máscara de subred en decimal
 */
function get_wildcard_mask(subnetMask) {
    var wildcardMask = [];

    // Pasar máscara de subred a formato
    const subneMaskFormat = string_to_ip(subnetMask);
    
    // Obtener máscara wildcard
    for (let i = 0; i < 4; i++) {
        wildcardMask.push(255 - subneMaskFormat[i]);
    }
    
    return wildcardMask.join('.');
}

/**
 * Obtiene la dirección de subred
 * @param {String} ipAddress Dirección IP en decimal
 * @param {String} subnetMask Máscara de subred en decimal
 */
function get_subnet_address(ipAddress, subnetMask) {
    var subnetAddress = [];

    // Pasar dirección IP y máscara de subred a formato
    const ipFormat = string_to_ip(ipAddress);
    const subnetMaskFormat = string_to_ip(subnetMask);
    
    // Obtener dirección de subred
    for (let i = 0; i < 4; i++) {
        subnetAddress.push(ipFormat[i] & subnetMaskFormat[i]);
    }

    return subnetAddress.join('.');
}

/**
 * Obtiene la dirección broadcast
 * @param {String} ipAddress Dirección IP en decimal
 * @param {String} wildcardMask Máscara wildcard en decimal
 */
function get_broadcast_address(ipAddress, wildcardMask) {
    var broadcastAddress = [];

    // Pasar dirección IP y máscara wildcard a formato
    const ipFormat = string_to_ip(ipAddress);
    const wildcardMaskFormat = string_to_ip(wildcardMask);
    
    // Obtener dirección broadcast
    for (let i = 0; i < 4; i++) {
        broadcastAddress.push(ipFormat[i] | wildcardMaskFormat[i]);
    }
    
    return broadcastAddress.join('.');
}

/**
 * Obtiene el rango de IP útil
 * @param {String} subnetAddress Dirección de subred en decimal
 * @param {String} broadcastAddress Dirección broadcast en decimal
 */
function get_usable_ip_range(subnetAddress, broadcastAddress) {
    var ipRange = '';

    // Pasar dirección de subred y dirección broadcast a formato
    const subnetAddressFormat = string_to_ip(subnetAddress);
    const broadcastAddressFormat = string_to_ip(broadcastAddress);

    // Obtener primer dirección útil
    ipRange += (subnetAddressFormat[0]) + '.';
    ipRange += (subnetAddressFormat[1]) + '.';
    ipRange += (subnetAddressFormat[2]) + '.';
    ipRange += (subnetAddressFormat[3] + 1);

    ipRange += ' - ';

    // Obtener última dirección útil
    ipRange += (broadcastAddressFormat[0]) + '.';
    ipRange += (broadcastAddressFormat[1]) + '.';
    ipRange += (broadcastAddressFormat[2]) + '.';
    ipRange += (broadcastAddressFormat[3] - 1);

    return ipRange;
}

/**
 * Retorna la máscara de red
 * @param {String} ipClass Clase de IP
 */
function get_netmask(ipClass) {
    // Clase A
    if (ipClass == 'A') return [255, 0, 0, 0];
    // Clase B
    if (ipClass == 'B') return [255, 255, 0, 0];
    
    // Clase C
    return [255, 255, 255, 0];
}

/**
 * Obtiene los bits de subred
 * @param {String} ipClass Clase de IP
 * @param {String} subnetMask Máscara de subred en decimal
 */
function get_subnet_bits(ipClass, subnetMask) {
    var subnetBits = 0;
    var temp = [];

    // Obtener y pasar máscara de red y máscara de subred a formato
    const netmaskFormat = get_netmask(ipClass);
    const subneMaskFormat = string_to_ip(subnetMask);

    // Obtener subredes
    for (let i = 0; i < 4; i++) {
        temp.push(netmaskFormat[i] ^ subneMaskFormat[i]);
    }

    // Contar bits de subred
    for (let i = 0; i < 4; i++) {
        let binary = temp[i].toString(2);
        for (let j = 0; j < binary.length; j++) {
            if (binary.charAt(j) === '1') subnetBits++;
        }
    }

    return subnetBits;
}

/**
 * Obtiene el número de bits de subred
 * @param {Number} subnets Número de subredes buscadas
 */
function get_subnet_bits_by_subnets(subnets) {
    const n = Math.ceil(Math.log2(subnets));
    return n;
}

/**
 * Obtiene el número de subredes
 * @param {Number} subnetBits Número de bits de subred
 */
function get_subnets(subnetBits) {
    return 2**subnetBits;
}

/**
 * Obtiene los bits de host
 * @param {String} wildcardMask Máscara wildcard en decimal
 */
function get_host_bits(wildcardMask) {
    var hostBits = 0;

    // Pasar máscara wildcard a formato
    const wildcardMaskFormat = string_to_ip(wildcardMask);

    // Contar el número de bits de host
    for (let i = 0; i < 4; i++) {
        let binary = wildcardMaskFormat[i].toString(2);
        for (let j = 0; j < binary.length; j++) {
            if (binary.charAt(j) === '1') hostBits++;
        }
    }

    return hostBits;
}

/**
 * Obtiene el número de bits de host
 * @param {Number} hosts Número de hosts buscados
 */
function get_host_bits_by_hosts(hosts) {
    const n = Math.ceil(Math.log2(hosts));
    return n;
}

/**
 * Obtiene el número de hosts totales y útiles
 * @param {Number} hostBits Número de bits de host
 */
function get_hosts(hostBits) {
    const x = 2**hostBits;
    const hosts = {
        totalHosts: x,
        usableHosts: x - 2
    };

    return hosts;
}

/**
 * Imprime los resultados por consola y en HTML
 * @param {Object} result Resultados del subneteo
 * @param {String} method Método utilizado para el subneteo
 */
function print_results(result, method) {
    // Imprimir resultados el HTML
    $('#method').text('Resultado por ' + method + ':');
    $('#ip').text(result.ipAddress);
    $('#binaryIP').text(result.binaryIP);
    $('#ipClass').text(result.ipClass);
    $('#privateIP').text(result.privateIP);
    $('#subnetMaskR').text(result.subnetMask);
    $('#cidrR').text(result.cidr);
    $('#wildcardMask').text(result.wildcardMask);
    $('#subnetAddress').text(result.subnetAddress);
    $('#broadcastAddress').text(result.broadcastAddress);
    $('#ipRange').text(result.ipRange);
    $('#subnetBits').text(result.subnetBits);
    $('#subnetsR').text(result.subnets);
    $('#hostBits').text(result.hostBits);
    $('#usableHosts').text(result.hosts.usableHosts);
    $('#totalHosts').text(result.hosts.totalHosts);

    // Imprimir resultaods por consola
    console.log('#### Resultado por ' + method + ' ####');
    console.log('IP:\t\t\t\t\t\t\t', result.ipAddress);
    console.log('IP en binario:\t\t\t\t', result.binaryIP);
    console.log('Clase de  IP:\t\t\t\t', result.ipClass);
    console.log('IP privada:\t\t\t\t\t', result.privateIP);
    console.log('Máscara de subred:\t\t\t', result.subnetMask);
    console.log('CIDR:\t\t\t\t\t\t', result.cidr);
    console.log('Máscara wildcard:\t\t\t', result.wildcardMask);
    console.log('Dirección de subred:\t\t', result.subnetAddress);
    console.log('Dirección broadcast:\t\t', result.broadcastAddress);
    console.log('Rango de IP:\t\t\t\t', result.ipRange);
    console.log('Bits de subred:\t\t\t\t', result.subnetBits);
    console.log('Número de subredes:\t\t\t', result.subnets);
    console.log('Bits de host:\t\t\t\t', result.hostBits);
    console.log('Número de host útiles:\t\t', result.hosts.usableHosts);
    console.log('Número total de host:\t\t', result.hosts.totalHosts);
}