import pandas as pd
from django.db import models
class User(models.Model):
    username = models.CharField(max_length=20,default="Anonymous")
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=10)
    rol=models.CharField(max_length=10)

class File(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='excel_files')
    file = models.FileField(upload_to='excel_files/')
    uploaded_at = models.DateTimeField(auto_now_add=True)
    file_type = models.CharField(max_length=10, choices=[('csv', 'CSV'), ('xls', 'XLS'), ('xlsx', 'XLSX')])

    def __str__(self):
        return f'{self.user.email} - {self.file.name}'

    def extraer_data(self):
        archivo = self.file.path

        try:
            if self.file_type == 'csv':
                df = pd.read_csv(archivo)
            elif self.file_type in ['xls', 'xlsx']:
                df = pd.read_excel(archivo)

            data_array = df.to_numpy()
            processed_data = {
                "columns": df.columns.tolist(),
                "summary": df.describe().to_dict(),
                "data_array": data_array.tolist()
            }
            return processed_data

        except Exception as e:
            return {"error": f"No se pudo procesar el archivo: {str(e)}"}
