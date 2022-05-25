{{/*
Expand the name of the chart.
*/}}
{{- define "zloi-admin.name" -}}
{{- default .Chart.Name .Values.admin.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "zloi-admin.fullname" -}}
{{- if .Values.admin.fullnameOverride }}
{{- .Values.admin.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.admin.nameOverride }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}
{{- end }}



{{- define "zloi-admin.hostname" -}}
{{- printf "%s.%s" "admin" .Values.ingress.hostname }}
{{- end -}}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "zloi-admin.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "zloi-admin.labels" -}}
helm.sh/chart: {{ include "zloi-admin.chart" . }}
{{ include "zloi-admin.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
app.kubernetes.io/component: admin
{{- end }}

{{/*
Selector labels
*/}}
{{- define "zloi-admin.selectorLabels" -}}
app.kubernetes.io/name: {{ include "zloi-admin.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/*
Create the name of the service account to use
*/}}
{{- define "zloi-admin.serviceAccountName" -}}
{{- if .Values.serviceAccount.create }}
{{- default (include "zloi-admin.fullname" .) .Values.serviceAccount.name }}
{{- else }}
{{- default "default" .Values.serviceAccount.name }}
{{- end }}
{{- end }}
