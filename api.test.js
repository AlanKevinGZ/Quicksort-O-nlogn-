const { ordenResult, api } = require('./01.js');


describe('Funciones de la API y QuickSort', () => {
    describe('ordenResult', () => {
        test('debe ordenar un arreglo de objetos por la propiedad pattern', () => {
            const input = [
                { pattern: 3 },
                { pattern: 1 },
                { pattern: 2 }
            ];
            const expectedOutput = [
                { pattern: 1 },
                { pattern: 2 },
                { pattern: 3 }
            ];

            expect(ordenResult(input)).toEqual(expectedOutput);
        });

        test('debe devolver el mismo arreglo si tiene un solo elemento', () => {
            const input = [{ pattern: 1 }];
            expect(ordenResult(input)).toEqual(input);
        });

        test('debe devolver un arreglo vacío si se le pasa un arreglo vacío', () => {
            const input = [];
            expect(ordenResult(input)).toEqual(input);
        });
    });

    describe('api', () => {
        beforeEach(() => {
            global.fetch = jest.fn(); 
        });

        afterEach(() => {
            jest.resetAllMocks(); 
        });

        test('debe llamar a la API y retornar los datos ordenados', async () => {
            const mockData = { data: [{ pattern: 3 }, { pattern: 1 }, { pattern: 2 }] };
            fetch.mockResolvedValueOnce({
                json: jest.fn().mockResolvedValueOnce(mockData),
            });

            const result = await api();
            expect(fetch).toHaveBeenCalledWith('https://catfact.ninja/breeds');
            expect(result).toEqual([
                { pattern: 1 },
                { pattern: 2 },
                { pattern: 3 }
            ]);
        });

        test('debe manejar errores en la API', async () => {
            fetch.mockRejectedValueOnce(new Error('Error de red'));

            const result = await api();
            expect(result).toBeNull();
            expect(console.error).toHaveBeenCalledWith(expect.any(Error));
        });
    });
});
